import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { playSong, togglePlayPause, updateProgress } from "../../redux/slices/playbackSlice";
import audioPlayerInstance from "../../utils/audioUtils";

export function useSongPlayback({ previewUrl, duration, initialProgress, externalUrl, songData }) {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(initialProgress / duration);
  const [currentPreview, setCurrentPreview] = useState(null);
  

useEffect(() => {
  console.log("useSongPlayback triggered");
  console.log("Parameters:", { previewUrl, duration, initialProgress, externalUrl, songData });

  if (!previewUrl && !externalUrl) {
    console.error("Error: Both previewUrl and externalUrl are missing.");
    Alert.alert("Error", "No preview or external link available for this song.");
    return;
  }

  if (currentPreview === previewUrl) {
    return;
  }

  setCurrentPreview(previewUrl);

  const loadSong = async () => {
    console.log("loadSong triggered for:", songData?.songTitle);

    if (!previewUrl) {
      console.warn("Preview URL is missing. Redirecting to external URL.");
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
                console.log("Spotify link opened:", externalUrl);
              } catch (error) {
                console.error("Error opening Spotify link:", error);
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
        console.log("Loading and playing preview URL:", previewUrl);
        await audioPlayerInstance.loadAndPlay(previewUrl, (status) => {
          if (status.isLoaded) {
            console.log("Audio loaded successfully.");
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
      }
    } catch (error) {
      console.error("Error loading song:", error);
      Alert.alert("Error", "Unable to load the song.");
    }
  };

  loadSong();

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
    console.log("Clearing playback interval.");
    clearInterval(interval);
  };
}, [dispatch, previewUrl, externalUrl, duration, initialProgress, songData, currentPreview]);


  return { progress, setProgress };
}
