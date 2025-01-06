import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { fetchSpotifyPlaylistTracks } from "../api/spotifyAuth";
import { getPlaylistSongs } from "../api/playlistService";
import { getToken } from "../utils/secureStore";
import { setPlaylistTracks, clearPlaylistTracks } from "../redux/slices/playlistTracksSlice";

export const usePlaylistTracks = (playlistId, playlistName, user) => {
  const dispatch = useDispatch();
  const cachedTracks = useSelector((state) => state.playlistTracks.tracks[playlistId]);
  const isFetched = useSelector((state) => state.playlistTracks.isFetched[playlistId]);

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlaylistTracks = async () => {
    try {
      setLoading(true);

      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) throw new Error("User is not logged in.");

      // Clear existing tracks before fetching new ones
      setTracks([]);
      dispatch(clearPlaylistTracks(playlistId));

      let fetchedTracks = [];
      if (playlistName === "My Favorite Songs") {
        console.log("Fetching songs for 'My Favorite Songs'...");
        const favoriteSongs = await getPlaylistSongs(jwtToken, playlistId);
        fetchedTracks = favoriteSongs?.songs?.map((song) => ({
          id: song.id,
          name: song.metadata?.title || "Unknown Title",
          artists: [song.metadata?.artist || "Unknown Artist"],
          album: {
            images: song.metadata?.image ? [{ url: song.metadata.image }] : [],
            uri: song.metadata?.uri || null,
          },
          externalUrl: song.metadata?.externalUrl || null,
          preview_url: song.metadata?.previewUrl || null,
          duration_ms: parseInt(song.metadata?.duration || 0, 10),
        }));
      } else if (user?.spotifyId) {
        console.log("Fetching Spotify playlist tracks...");
        fetchedTracks = await fetchSpotifyPlaylistTracks(playlistId, jwtToken);
      } else {
        console.log("Fetching local playlist tracks...");
        const localTracks = await getPlaylistSongs(jwtToken, playlistId);
        fetchedTracks = localTracks?.songs || [];
      }

      setTracks(fetchedTracks || []);
      dispatch(setPlaylistTracks({ playlistId, tracks: fetchedTracks || [] }));
    } catch (error) {
      console.error("Error loading playlist tracks:", error.message || error);
      Alert.alert("Error", "Failed to load playlist tracks. Please try again.");
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Always fetch new data if the playlist is "My Favorite Songs" or data is not cached
    if (playlistId && (!isFetched || playlistName === "My Favorite Songs")) {
      loadPlaylistTracks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId, playlistName, user]);

  return { tracks, loading };
};
