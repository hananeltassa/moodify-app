import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getUserPlaylists } from "../../api/playlistService";
import { getToken } from "../../utils/secureStore";

export function useFavoritePlaylist() {
  const [favoritePlaylistId, setFavoritePlaylistId] = useState(null);

  useEffect(() => {
    const loadFavoritePlaylist = async () => {
      try {
        const jwtToken = await getToken("jwtToken");
        if (!jwtToken) {
          Alert.alert("Error", "User is not logged in.");
          return;
        }

        const playlists = await getUserPlaylists(jwtToken);
        const favoritePlaylist = playlists.playlists.find((playlist) => playlist.is_default);

        if (favoritePlaylist) {
          setFavoritePlaylistId(favoritePlaylist.id);
        } else {
          Alert.alert("Error", "Default playlist not found.");
        }
      } catch (error) {
        console.error("Error fetching favorite playlist:", error);
        Alert.alert("Error", "Failed to fetch favorite playlist.");
      }
    };

    loadFavoritePlaylist();
  }, []);

  return favoritePlaylistId;
}