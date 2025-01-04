import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { playSong, togglePlayPause, updateProgress, stopPlayback } from "../../redux/slices/playbackSlice";
import { Audio } from "expo-av";

export default function SongPage() {
  const { songImage, songTitle, songArtist, externalUrl, previewUrl, duration } = useLocalSearchParams();

  const dispatch = useDispatch();
  const router = useRouter();
  const soundRef = useRef(null);

  const { isPlaying, currentSong } = useSelector((state) => state.playback);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSong = async () => {
      if (!previewUrl) return;

      try {
        // Stop and unload any previous sound
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        // Load and play the new sound
        const { sound } = await Audio.Sound.createAsync(
          { uri: previewUrl },
          { shouldPlay: true }
        );

        soundRef.current = sound;
        dispatch(
          playSong({
            songImage,
            songTitle,
            songArtist,
            externalUrl,
            previewUrl,
            duration,
          })
        );

        // Set playback status update
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setProgress(status.positionMillis / (duration || status.durationMillis));
            dispatch(updateProgress(status.positionMillis));

            if (status.didJustFinish) {
              dispatch(togglePlayPause());
            }
          }
        });
      } catch (error) {
        console.error("Error loading song:", error);
        Alert.alert("Error", "Unable to load the song.");
      }
    };

    loadSong();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
      dispatch(stopPlayback());
    };
  }, [dispatch, previewUrl, songImage, songTitle, songArtist, externalUrl, duration]);

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    try {
      setLoading(true);
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
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
            if (soundRef.current) {
              soundRef.current.setPositionAsync(value * duration);
              setProgress(value);
            }
          }}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">{formatDuration(progress * duration)}</Text>
          <Text className="text-white text-sm">{formatDuration(duration)}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-evenly mb-10">
        <TouchableOpacity disabled={loading}>
          <Ionicons name="play-skip-back" size={36} color={loading ? "gray" : "white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause} disabled={loading}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color={loading ? "gray" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity disabled={loading}>
          <Ionicons name="play-skip-forward" size={36} color={loading ? "gray" : "white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}