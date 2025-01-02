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
      onPress={() => router.push(`/music/[music]?songImage=${currentSong.songImage}&songTitle=${currentSong.songTitle}&songArtist=${currentSong.songArtist}`)}
      className="absolute bottom-1 left-0 right-0 bg-orange-700 flex-row items-center p-2 rounded-xl"
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: currentSong.songImage || "https://via.placeholder.com/50" }}
        style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
      />
      
      {/* Song Info */}
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>{currentSong.songTitle}</Text>
        <Text style={{ color: "#AAAAAA", fontSize: 12 }}>{currentSong.songArtist}</Text>
      </View>

      {/* Play/Pause Button */}
      <TouchableOpacity
        className="justify-center items-center px-3"
        onPress={(e) => {
          e.stopPropagation();
          dispatch(togglePlayPause());
        }}
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

    </TouchableOpacity>
  );
}
