import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SongPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <View className="flex-row items-center justify-between mb-4">

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-down" size={28} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold">Playlist Name</Text>

        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  );
}
