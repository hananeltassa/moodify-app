import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../redux/slices/playlistTracksSlice";
import { addSongToPlaylist, deleteSongFromPlaylist } from "../api/playlistService";
import { getToken } from "../utils/secureStore";
import { Alert } from "react-native";

export const useToggleFavorite = (songData) => {
  const { songTitle, songImage, songArtist, externalUrl, previewUrl, duration } = songData;

  const dispatch = useDispatch();
  const favoriteTracks = useSelector((state) => state.playlistTracks.tracks);
  const favoritePlaylistId = useSelector((state) => state.playlistTracks.favoritePlaylistId);
  const [isLiked, setIsLiked] = useState(false);

  // Check if the song is already in the favorite playlist
  useState(() => {
    if (favoritePlaylistId && favoriteTracks[favoritePlaylistId]) {
      const isFavorite = favoriteTracks[favoritePlaylistId].some(
        (track) => track.name === songTitle && track.liked
      );
      setIsLiked(isFavorite);
    }
  }, [favoritePlaylistId, favoriteTracks, songTitle]);

  const toggleFavorite = async () => {
    try {
      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) {
        Alert.alert("Error", "User is not logged in.");
        return;
      }

      if (isLiked) {
        const trackToRemove = favoriteTracks[favoritePlaylistId]?.find(
          (track) => track.name === songTitle
        );

        if (!trackToRemove) {
          Alert.alert("Error", "Track not found in the playlist.");
          return;
        }

        await deleteSongFromPlaylist(jwtToken, favoritePlaylistId, songTitle);
        dispatch(removeTrackFromPlaylist({ playlistId: favoritePlaylistId, trackId: trackToRemove.id }));
        Alert.alert("Removed", "Song removed from 'My Favorite Songs'.");
      } else {
        if (!favoritePlaylistId) {
          Alert.alert("Error", "Default playlist not set.");
          return;
        }

        const metadata = {
          id: songTitle,
          image: songImage || "https://via.placeholder.com/300",
          title: songTitle || "Unknown Title",
          artist: songArtist || "Unknown Artist",
          externalUrl: externalUrl || null,
          previewUrl: previewUrl || null,
          duration: duration || 0,
          liked: true,
        };

        const response = await addSongToPlaylist(jwtToken, favoritePlaylistId, "local", null, metadata);
        dispatch(
          addTrackToPlaylist({
            playlistId: favoritePlaylistId,
            track: {
              id: response.song.metadata.id || songTitle,
              name: response.song.metadata.title || "Unknown Title",
              artists: [response.song.metadata.artist || "Unknown Artist"],
              album: {
                images: response.song.metadata.image ? [{ url: response.song.metadata.image }] : [],
              },
              externalUrl: response.song.metadata.externalUrl || null,
              preview_url: response.song.metadata.previewUrl || null,
              duration_ms: parseInt(response.song.metadata.duration || 0, 10),
              liked: true,
            },
          })
        );
        Alert.alert("Added", "Song added to 'My Favorite Songs'.");
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating favorites:", error);
      Alert.alert("Error", "Failed to update 'My Favorite Songs'. Please try again.");
    }
  };

  return { isLiked, toggleFavorite };
};
