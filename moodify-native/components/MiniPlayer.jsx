import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MiniPlayer({ onExpand, isPlaying, onPlayPause }) {
  return (
    <TouchableOpacity
      onPress={onExpand}
      className="absolute bottom-0 left-0 right-0 bg-[#1E1E2E] flex-row items-center p-4 rounded-xl"
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        className="w-12 h-12 rounded-md mr-4"
      />
      
      {/* Song Info */}
      <View className="flex-1">
        <Text className="text-white text-sm font-bold">Wildest Dreams</Text>
        <Text className="text-gray-400 text-xs">Taylor Swift</Text>
      </View>

      {/* Play/Pause Button */}
      <TouchableOpacity onPress={onPlayPause}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
