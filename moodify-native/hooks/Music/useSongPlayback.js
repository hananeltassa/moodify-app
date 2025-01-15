import { useEffect, useState, useRef } from "react";
import { Alert, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { playSong, togglePlayPause, updateProgress } from "../../redux/slices/playbackSlice";
import audioPlayerInstance from "../../utils/audioUtils";

export function useSongPlayback({ previewUrl, duration, initialProgress, externalUrl, songData }) {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(initialProgress / (duration || 1));
  const isLoading = useRef(false); // Tracks whether a song is being loaded
  const currentPreviewUrl = useRef(null); // Tracks the currently loaded song
  const alertShown = useRef(false); // Prevents multiple alerts

  useEffect(() => {
    /**
     * Stops and unloads any previously playing audio.
     */
    const stopAndUnloadPrevious = async () => {
      if (audioPlayerInstance.soundRef) {
        console.log("Stopping and unloading the previous song...");
        try {
          await audioPlayerInstance.stop();
          await audioPlayerInstance.unload();
          console.log("Previous song unloaded.");
        } catch (error) {
          console.error("Error unloading previous song:", error);
        }
      }
    };

    /**
     * Loads and plays a new song, setting the initial position if provided.
     */
    const loadAndPlayNewSong = async () => {
      try {
        console.log("Loading song with previewUrl:", previewUrl);

        // Load and start playback with a status listener
        await audioPlayerInstance.loadAndPlay(previewUrl, (status) => {
          if (status.isLoaded) {
            const currentProgress = status.positionMillis / (duration || status.durationMillis || 1);
            if (!isNaN(currentProgress) && currentProgress >= 0 && currentProgress <= 1) {
              setProgress(currentProgress);
              dispatch(updateProgress(status.positionMillis));
            }

            if (status.didJustFinish) {
              console.log("Playback finished.");
              dispatch(togglePlayPause());
            }
          }
        });

        // Set the initial playback position if provided
        if (initialProgress > 0) {
          const validatedInitialProgress = Math.min(initialProgress, duration || 0);
          console.log("Setting initial playback position:", validatedInitialProgress);
          await audioPlayerInstance.setPosition(validatedInitialProgress);
        }

        dispatch(playSong(songData));
        currentPreviewUrl.current = previewUrl; // Mark this song as loaded
      } catch (error) {
        console.error("Error loading and playing the song:", error);
        Alert.alert("Error", "Unable to load the song.");
      }
    };

    /**
     * Handles playback logic, ensuring valid inputs and avoiding redundant loading.
     */
    const handlePlayback = async () => {
      if (currentPreviewUrl.current === previewUrl) {
        console.log("Skipping reload for the same preview URL.");
        return;
      }

      isLoading.current = true;

      await stopAndUnloadPrevious();

      if (!previewUrl || previewUrl === "null") {
        if (!alertShown.current) {
          alertShown.current = true;
          Alert.alert(
            "No Preview Available",
            "This song does not have a preview. Would you like to open it on Spotify?",
            [
              { text: "Cancel", style: "cancel", onPress: () => (alertShown.current = false) },
              {
                text: "Open Spotify",
                onPress: async () => {
                  try {
                    await Linking.openURL(externalUrl);
                    console.log("Spotify link opened:", externalUrl);
                  } catch (error) {
                    console.error("Error opening Spotify link:", error);
                    Alert.alert("Error", "Unable to open Spotify.");
                  } finally {
                    alertShown.current = false;
                  }
                },
              },
            ]
          );
        }
        currentPreviewUrl.current = null; // Reset the current URL
        isLoading.current = false; // Allow subsequent loads
        return;
      }

      await loadAndPlayNewSong();
      isLoading.current = false;
    };

    if (!isLoading.current) {
      handlePlayback();
    }

    const interval = setInterval(async () => {
      try {
        const status = await audioPlayerInstance.soundRef?.getStatusAsync();
        if (status?.isLoaded) {
          const positionMillis = status.positionMillis || 0;
          const durationMillis = status.durationMillis || 1;
          const currentProgress = positionMillis / durationMillis;

          if (!isNaN(currentProgress) && currentProgress >= 0 && currentProgress <= 1) {
            setProgress(currentProgress);
            dispatch(updateProgress(positionMillis));
          }
        }
      } catch (error) {
        console.error("Error updating playback progress:", error);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, previewUrl, externalUrl, duration, songData, initialProgress]);

  return { progress, setProgress };
}
