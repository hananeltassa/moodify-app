import React from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { playSong, togglePlayPause, updateProgress } from "../../redux/slices/playbackSlice";

export default function SongPage() {
  const { songImage, songTitle, songArtist } = useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { isPlaying, progress } = useSelector((state) => state.playback);

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const startPlaying = () => {
    dispatch(
      playSong({
        songImage,
        songTitle,
        songArtist,
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", margin: 10 }}>
      {/* Header with Close Icon */}
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

      {/* Album Art */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={
            songImage
              ? { uri: songImage }
              : { uri: "https://via.placeholder.com/300" }
          }
          style={{ width: 400, height: 400, borderRadius: 10 }}
        />
      </View>

      {/* Song Info & Like Button */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-2xl font-bold">{songTitle || "Unknown Title"}</Text>
            <Text className="text-gray-400 text-lg">{songArtist || "Unknown Artist"}</Text>
          </View>
          <TouchableOpacity onPress={handlePlayPause}>
            <Ionicons
              name={isPlaying ? "heart" : "heart-outline"}
              size={32}
              color="#FF6100"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Slider */}
      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FF6100"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FF6100"
          value={progress}
          onValueChange={(value) => dispatch(updateProgress(value))}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">{Math.floor(progress * 60)}:{Math.floor((progress * 60) % 60)}</Text>
          <Text className="text-white text-sm">1:18</Text>
        </View>
      </View>

      {/* Playback Controls */}
      <View className="flex-row items-center justify-evenly mb-10">
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={startPlaying}>
          <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={80} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
