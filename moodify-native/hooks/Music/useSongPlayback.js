import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { playSong, togglePlayPause, updateProgress } from "../../redux/slices/playbackSlice";
import audioPlayerInstance from "../../utils/audioUtils";

export function useSongPlayback({ previewUrl, duration, initialProgress, externalUrl, songData }) {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(initialProgress / duration);
  const [hasLoaded, setHasLoaded] = useState(false); // Prevent double execution

  useEffect(() => {
    if (hasLoaded) return; // Skip if already executed
    setHasLoaded(true);

    const loadSong = async () => {
      console.log("loadSong triggered");

      if (!previewUrl) {
        if (!externalUrl) {
          Alert.alert("Error", "No Spotify link available.");
          return;
        }

        Alert.alert(
          "No Preview Available",
          "This song does not have a preview. Would you like to open it on Spotify?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Spotify",
              onPress: async () => {
                try {
                  await Linking.openURL(externalUrl);
                } catch {
                  Alert.alert("Error", "Unable to open Spotify.");
                }
              },
            },
          ]
        );
        return;
      }

      try {
        if (audioPlayerInstance.currentUri !== previewUrl) {
          await audioPlayerInstance.loadAndPlay(previewUrl, (status) => {
            if (status.isLoaded) {
              setProgress(status.positionMillis / (duration || status.durationMillis));
              dispatch(updateProgress(status.positionMillis));
              if (status.didJustFinish) {
                dispatch(togglePlayPause());
              }
            }
          });

          if (initialProgress > 0) {
            await audioPlayerInstance.setPosition(initialProgress);
          }

          dispatch(playSong(songData));
        }
      } catch (error) {
        Alert.alert("Error", "Unable to load the song.");
      }
    };

    loadSong();

    const interval = setInterval(async () => {
      const status = await audioPlayerInstance.soundRef?.getStatusAsync();
      if (status?.isLoaded) {
        const currentProgress = status.positionMillis / status.durationMillis;
        setProgress(currentProgress);
        dispatch(updateProgress(status.positionMillis));
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch, previewUrl, externalUrl, duration, initialProgress, songData, hasLoaded]);

  return { progress, setProgress };
}
