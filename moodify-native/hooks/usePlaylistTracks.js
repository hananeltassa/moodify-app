import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { fetchSpotifyPlaylistTracks } from "../api/spotifyAuth";
import { getPlaylistSongs } from "../api/playlistService";
import { getToken } from "../utils/secureStore";
import { setPlaylistTracks } from "../redux/slices/playlistTracksSlice";

export const usePlaylistTracks = (playlistId, playlistName, user) => {
  const dispatch = useDispatch();

  const cachedTracks = useSelector((state) => state.playlistTracks.tracks[playlistId] || []);
  const isFetched = useSelector((state) => state.playlistTracks.isFetched[playlistId] || false);

  const favoritePlaylistId = useSelector((state) =>
    state.playlists.items.find((playlist) => playlist.is_default)?.id
  );

  const [loading, setLoading] = useState(!isFetched);

  const loadPlaylistTracks = async () => {
    try {
      setLoading(true);
  
      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) throw new Error("User is not logged in.");
  
      let fetchedTracks = [];
      let favoriteSongsNames = [];
  
      if (playlistName !== "My Favorite Songs" && favoritePlaylistId) {
        const favoriteSongs = await getPlaylistSongs(jwtToken, favoritePlaylistId);
        //console.log("Favorite Songs Response:", favoriteSongs);
  
        favoriteSongsNames = favoriteSongs?.songs?.map((song) => song.metadata?.title || "") || [];
        //console.log("Favorite Songs Names:", favoriteSongsNames);
      }
  
      if (playlistName === "My Favorite Songs") {
        const favoriteSongs = await getPlaylistSongs(jwtToken, playlistId);
        fetchedTracks = favoriteSongs?.songs?.map((song) => ({
          id: song.id,
          name: song.metadata?.title || "Unknown Title",
          artists: [song.metadata?.artist || "Unknown Artist"],
          album: {
            images: song.metadata?.image ? [{ url: song.metadata.image }] : [],
          },
          externalUrl: song.metadata?.externalUrl || null,
          preview_url: song.metadata?.previewUrl || null,
          duration_ms: parseInt(song.metadata?.duration || 0, 10),
          liked: true,
        }));
      } else if (user?.spotifyId) {
        fetchedTracks = await fetchSpotifyPlaylistTracks(playlistId, jwtToken);
        //console.log("Spotify Tracks Response:", fetchedTracks);
  
        fetchedTracks = fetchedTracks.map((track) => ({
          ...track,
          liked: favoriteSongsNames.includes(track.name),
        }));
      } else {
        const localTracks = await getPlaylistSongs(jwtToken, playlistId);
        //console.log("Local Tracks Response:", localTracks);
  
        fetchedTracks = localTracks?.songs?.map((track) => ({
          ...track,
          liked: favoriteSongsNames.includes(track.metadata?.title || ""),
        }));
      }
  
      //console.log("Fetched Tracks:", fetchedTracks);
  
      dispatch(setPlaylistTracks({ playlistId, tracks: fetchedTracks || [] }));
    } catch (error) {
      console.error("Error loading playlist tracks:", error.message || error);
      Alert.alert("Error", "Failed to load playlist tracks. Please try again.");
    } finally {
      setLoading(false);
      console.log("Finished loading playlist tracks.");
    }
  };
  

  const toggleLike = (trackId) => {
    const updatedTracks = cachedTracks.map((track) =>
      track.id === trackId ? { ...track, liked: !track.liked } : track
    );
    dispatch(setPlaylistTracks({ playlistId, tracks: updatedTracks }));
  };

  useEffect(() => {
    if (playlistId && !isFetched) {
      loadPlaylistTracks();
    }
  }, [playlistId, isFetched, user]);

  return { tracks: cachedTracks, loading, toggleLike };
};
