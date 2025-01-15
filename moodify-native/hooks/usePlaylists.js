import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../utils/secureStore";
import { fetchSpotifyPlaylists } from "../api/spotifyAuth";
import { createPlaylist, getUserPlaylists } from "../api/playlistService";
import { setPlaylists } from "../redux/slices/playlistSlice";

export const usePlaylists = (user) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.items);
  const isFetched = useSelector((state) => state.playlists.isFetched);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ensureDefaultPlaylistExists = async (jwtToken) => {
    try {
      const { playlists: fetchedPlaylists } = await getUserPlaylists(jwtToken);
      const likedSongsPlaylist = fetchedPlaylists.find((playlist) => playlist.is_default);

      if (!likedSongsPlaylist) {
        await createPlaylist(jwtToken, "My Favorite Songs", true);
        const updatedPlaylists = await getUserPlaylists(jwtToken);
        dispatch(setPlaylists(updatedPlaylists.playlists));
      } else {
        dispatch(setPlaylists(fetchedPlaylists));
      }
    } catch (err) {
      console.error("Error ensuring default playlist exists:", err);
      throw err;
    }
  };

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const jwtToken = await getToken("jwtToken");

      if (!jwtToken) {
        throw new Error("User is not logged in.");
      }

      await ensureDefaultPlaylistExists(jwtToken);

      if (user?.spotifyId) {
        const spotifyPlaylists = await fetchSpotifyPlaylists(jwtToken);
        const backendPlaylists = await getUserPlaylists(jwtToken);
        const combinedPlaylists = [
          ...backendPlaylists.playlists,
          ...spotifyPlaylists.filter(
            (spotifyPlaylist) =>
              !backendPlaylists.playlists.some(
                (backendPlaylist) => backendPlaylist.id === spotifyPlaylist.id
              )
          ),
        ];
        dispatch(setPlaylists(combinedPlaylists));
      }
    } catch (err) {
      //console.error("Error fetching playlists:", err);
      setError(err.message || "Failed to load playlists.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched) {
      fetchPlaylists();
    }
  }, [user]);

  return { playlists, loading, error };
};
