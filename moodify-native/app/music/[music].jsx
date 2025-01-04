import React, { useState, useEffect } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, Platform, Alert, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { playSong, togglePlayPause, updateProgress } from "../../redux/slices/playbackSlice";
import audioPlayerInstance from "../../utils/audioUtils";

export default function SongPage() {
  const { songImage, songTitle, songArtist, externalUrl, previewUrl, duration, progress: initialProgress = 0 } = useLocalSearchParams();

  const dispatch = useDispatch();
  const router = useRouter();
  const { isPlaying, currentSong } = useSelector((state) => state.playback);

  const [progress, setProgress] = useState(initialProgress / duration);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSong = async () => {
      if (!previewUrl) {
        Alert.alert(
          "No Preview Available",
          "This song does not have a preview. Would you like to open it on Spotify?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Spotify",
              onPress: () => {
                if (externalUrl) {
                  Linking.openURL(externalUrl).catch((err) =>
                    Alert.alert("Error", "Unable to open Spotify.")
                  );
                } else {
                  Alert.alert("Error", "No Spotify link available.");
                }
              },
            },
          ]
        );
        return;
      }

      try {
        if (audioPlayerInstance.currentUri !== previewUrl) {
          // Load and play the song
          await audioPlayerInstance.loadAndPlay(previewUrl, (status) => {
            if (status.isLoaded) {
              setProgress(status.positionMillis / (duration || status.durationMillis));
              dispatch(updateProgress(status.positionMillis));
              if (status.didJustFinish) {
                dispatch(togglePlayPause());
              }
            }
          });
          // Seek to the initial progress
          if (initialProgress > 0) {
            await audioPlayerInstance.setPosition(initialProgress);
          }

          dispatch(
            playSong({ songImage, songTitle, songArtist, externalUrl, previewUrl, duration })
          );
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
    }, 500); // Update progress every 500ms

    return () => clearInterval(interval); // Clear interval when leaving the page
  }, [dispatch, previewUrl, songImage, songTitle, songArtist, externalUrl, duration, initialProgress]);

  const handlePlayPause = async () => {
    setLoading(true);
    try {
      if (isPlaying) {
        await audioPlayerInstance.pause();
      } else {
        await audioPlayerInstance.play();
      }
      dispatch(togglePlayPause());
    } catch (error) {
      console.error("Playback toggle error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", margin: 10 }}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-down" : "chevron-back"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <Text className="text-white text-lg font-Avenir-Demi">Now Playing</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: songImage || "https://via.placeholder.com/300" }}
          style={{ width: 400, height: 400, borderRadius: 2 }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
        <Text className="text-white text-2xl font-Avenir-Bold">{songTitle || "Unknown Title"}</Text>
        <Text className="text-gray-400 text-lg font-avenir-regular">{songArtist || "Unknown Artist"}</Text>
      </View>

      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FF6100"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FF6100"
          value={progress}
          onSlidingComplete={(value) => {
            const position = value * duration;
            audioPlayerInstance.setPosition(position);
            setProgress(value);
          }}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">{formatDuration(progress * duration)}</Text>
          <Text className="text-white text-sm">{formatDuration(duration)}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-evenly mb-10">
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
