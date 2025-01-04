import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause } from "../redux/slices/playbackSlice";
import { useRouter } from "expo-router";

export default function MiniPlayer() {
  const { currentSong, isPlaying } = useSelector((state) => state.playback);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(
          `/music/[music]?songImage=${currentSong.songImage}&songTitle=${currentSong.songTitle}&songArtist=${currentSong.songArtist}&externalUrl=${currentSong.externalUrl}&previewUrl=${currentSong.previewUrl}&duration=${currentSong.duration}`
        )
      }
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
      <Image
        source={{ uri: currentSong.songImage || "https://via.placeholder.com/50" }}
        style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{currentSong.songTitle}</Text>
        <Text style={{ color: "#aaa" }}>{currentSong.songArtist}</Text>
      </View>
      <TouchableOpacity onPress={() => dispatch(togglePlayPause())}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
