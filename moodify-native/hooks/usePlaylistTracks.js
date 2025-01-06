import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { fetchSpotifyPlaylistTracks } from "../api/spotifyAuth";
import { getPlaylistSongs } from "../api/playlistService";
import { getToken } from "../utils/secureStore";
import { setPlaylistTracks } from "../redux/slices/playlistTracksSlice";

export const usePlaylistTracks = (playlistId, playlistName, user) => {
  const dispatch = useDispatch();

  // Get cached tracks and fetch status from Redux
  const cachedTracks = useSelector((state) => state.playlistTracks.tracks[playlistId] || []);
  const isFetched = useSelector((state) => state.playlistTracks.isFetched[playlistId] || false);

  const [loading, setLoading] = useState(!isFetched);

  const loadPlaylistTracks = async () => {
    try {
      setLoading(true);

      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) throw new Error("User is not logged in.");

      let fetchedTracks = [];
      if (playlistName === "My Favorite Songs") {
        // Fetch favorite songs from your API
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
        }));
      } else if (user?.spotifyId) {
        // Fetch tracks from Spotify
        fetchedTracks = await fetchSpotifyPlaylistTracks(playlistId, jwtToken);
      } else {
        // Fetch tracks from local playlist
        const localTracks = await getPlaylistSongs(jwtToken, playlistId);
        fetchedTracks = localTracks?.songs || [];
      }

      // Update Redux state with fetched tracks
      dispatch(setPlaylistTracks({ playlistId, tracks: fetchedTracks || [] }));
    } catch (error) {
      console.error("Error loading playlist tracks:", error.message || error);
      Alert.alert("Error", "Failed to load playlist tracks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlistId && !isFetched) {
      loadPlaylistTracks();
    }
  }, [playlistId, isFetched, user]);

  return { tracks: cachedTracks, loading };
};
