import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause } from "../redux/slices/playbackSlice";
import { useRouter } from "expo-router";
import audioPlayerInstance from "../utils/audioUtils";

export default function MiniPlayer() {
  const { currentSong, isPlaying } = useSelector((state) => state.playback);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await audioPlayerInstance.pause();
      } else {
        await audioPlayerInstance.play();
      }
      dispatch(togglePlayPause());
    } catch (error) {
      console.error("Error toggling play/pause in MiniPlayer:", error);
    }
  };

  const navigateToSongPage = async () => {
    try {
      const status = await audioPlayerInstance.soundRef?.getStatusAsync();
      const currentProgress = status?.positionMillis || 0;

      router.push({
        pathname: "/music/[music]",
        params: {
          songImage: currentSong.songImage,
          songTitle: currentSong.songTitle,
          songArtist: currentSong.songArtist,
          externalUrl: currentSong.externalUrl,
          previewUrl: currentSong.previewUrl,
          duration: currentSong.duration,
          progress: currentProgress,
        },
      });
    } catch (error) {
      console.error("Error navigating to song page:", error);
    }
  };

  if (!currentSong) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#333",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={navigateToSongPage}>
        <Image
          source={{ uri: currentSong.songImage || "https://via.placeholder.com/50" }}
          style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{currentSong.songTitle}</Text>
        <Text style={{ color: "#aaa" }}>{currentSong.songArtist}</Text>
      </View>
      <TouchableOpacity onPress={handlePlayPause}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
