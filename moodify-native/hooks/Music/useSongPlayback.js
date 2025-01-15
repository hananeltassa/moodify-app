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
    //console.log("useSongPlayback triggered with:", { previewUrl, duration, initialProgress, externalUrl,  songData,});

    const stopAndUnloadPrevious = async () => {
      if (audioPlayerInstance.soundRef) {
        console.log("Stopping and unloading the previous song...");
        await audioPlayerInstance.stop();
        await audioPlayerInstance.unload();
        console.log("Previous song unloaded.");
      }
    };

    const loadAndPlayNewSong = async () => {
      try {
        console.log("Loading song with previewUrl:", previewUrl);

        await audioPlayerInstance.loadAndPlay(previewUrl, (status) => {
          if (status.isLoaded) {
            
            setProgress(status.positionMillis / (duration || status.durationMillis));
            dispatch(updateProgress(status.positionMillis));
            if (status.didJustFinish) {
              console.log("Playback finished.");
              dispatch(togglePlayPause());
            }
          }
        });

        if (initialProgress > 0) {
          console.log("Setting initial playback position:", initialProgress);
          await audioPlayerInstance.setPosition(initialProgress);
        }

        dispatch(playSong(songData));
        currentPreviewUrl.current = previewUrl; // Mark this song as loaded
      } catch (error) {
        console.error("Error loading and playing the song:", error);
        Alert.alert("Error", "Unable to load the song.");
      }
    };

    const handlePlayback = async () => {
      // Skip if the current song is already loaded
      if (currentPreviewUrl.current === previewUrl) {
        //console.log("Skipping reload for the same preview URL.");
        return;
      }

      // Ensure we wait until the previous song is completely unloaded
      isLoading.current = true;

      await stopAndUnloadPrevious();

      // Handle invalid preview URL
      if (!previewUrl || previewUrl === "null") {
        //console.warn("Invalid preview URL detected. Skipping playback.");
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
          const currentProgress = status.positionMillis / status.durationMillis;
          setProgress(currentProgress);
          dispatch(updateProgress(status.positionMillis));
        }
      } catch (error) {
        console.error("Error updating playback progress:", error);
      }
    }, 500);

    return () => {
      //console.log("Clearing playback interval.");
      clearInterval(interval);
    };
  }, [dispatch, previewUrl, externalUrl, duration, songData]);

  return { progress, setProgress };
}
