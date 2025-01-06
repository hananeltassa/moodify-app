import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { fetchSpotifyPlaylistTracks } from "../api/spotifyAuth";
import { getPlaylistSongs } from "../api/playlistService";
import { getToken } from "../utils/secureStore";
import { setPlaylistTracks, clearPlaylistTracks } from "../redux/slices/playlistTracksSlice";

export const usePlaylistTracks = (playlistId, playlistName, user) => {
  const dispatch = useDispatch();

  // Select cached tracks and fetch state from Redux
  const cachedTracks = useSelector((state) => state.playlistTracks.tracks[playlistId] || []);
  const isFetched = useSelector((state) => state.playlistTracks.isFetched[playlistId] || false);

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPlaylistTracks = async () => {
    try {
      setLoading(true);

      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) throw new Error("User is not logged in.");

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

      // Save fetched tracks to both local state and Redux
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

  // Fetch data from Redux or API
  useEffect(() => {
    if (playlistId) {
      if (cachedTracks.length > 0) {
        setTracks(cachedTracks);
        setLoading(false);
      } else if (!isFetched || playlistName === "My Favorite Songs") {
        // Fetch data from API if not cached or if playlist is "My Favorite Songs"
        loadPlaylistTracks();
      }
    }
  }, [playlistId, playlistName, user, cachedTracks, isFetched]); // Depend on Redux state to auto-update tracks

  return { tracks, loading };
};
