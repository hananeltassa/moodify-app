import { useState } from "react";

export const useTrackLikedStatus = (playlistTracks) => {
  const [isLiked, setIsLiked] = useState(false);

  const updateIsLiked = (title) => {
    if (playlistTracks) {
      const isFavorite = playlistTracks.some(
        (track) => track.name === title && track.liked
      );
      setIsLiked(isFavorite);
    }
  };

  return { isLiked, updateIsLiked };
};
