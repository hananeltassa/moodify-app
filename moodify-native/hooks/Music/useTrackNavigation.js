import { useCallback } from "react";

/**
 * Custom hook to navigate tracks in a playlist.
 * @param {Array} playlistTracks - Array of tracks in the playlist.
 * @param {string} currentSongTitle - Title of the current track.
 * @param {Function} dispatch - Redux dispatch function.
 * @param {Object} router - Router instance for navigation.
 * @param {Function} playSong - Redux action to play a song.
 * @param {Function} updateIsLiked - Function to update the "liked" state.
 * @param {string} playlistId - The current playlist ID.
 */
export const useTrackNavigation = ({
  playlistTracks,
  currentSongTitle,
  dispatch,
  router,
  playSong,
  updateIsLiked,
  playlistId,
}) => {
  const currentIndex = playlistTracks.findIndex(
    (track) => track.name === currentSongTitle
  );

  const navigateTrack = useCallback(
    (direction) => {
      const newIndex = currentIndex + direction;

      if (newIndex >= 0 && newIndex < playlistTracks.length) {
        const track = playlistTracks[newIndex];
        console.log(
          `Navigating to ${direction > 0 ? "next" : "previous"} track:`,
          track
        );

        // Dispatch the play action
        dispatch(
          playSong({
            songImage: track.album?.images?.[0]?.url || "",
            songTitle: track.name,
            songArtist: track.artists?.join(", ") || "Unknown Artist",
            externalUrl: track.externalUrl,
            previewUrl: track.preview_url,
            duration: track.duration_ms,
          })
        );

        // Update the URL parameters without triggering a full rerender
        router.setParams({
          songImage: track.album?.images?.[0]?.url || "",
          songTitle: track.name,
          songArtist: track.artists?.join(", ") || "Unknown Artist",
          externalUrl: track.externalUrl,
          previewUrl: track.preview_url,
          duration: track.duration_ms,
          playlistId,
        });

        // Update the "liked" state
        updateIsLiked(track.name);
      }
    },
    [currentIndex, playlistTracks, dispatch, router, playSong, updateIsLiked, playlistId]
  );

  return {
    skipForward: () => navigateTrack(1),
    skipBackward: () => navigateTrack(-1),
  };
};
