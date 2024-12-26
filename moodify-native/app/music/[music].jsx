import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
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
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-Avenir-Demi">Playlist Name</Text>

        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="items-center justify-center my-16">
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          className="w-96 h-96"
        />
      </View>

      {/* Song Info */}
      <View className="left-12">
        <Text className="text-white text-2xl font-Avenir-Bold">Wildest Dreams</Text>
        <Text className="text-gray-400 text-lg mb-2">Taylor Swift</Text>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={32}
            color={isLiked ? "#FF6100" : "white"}
          />
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}
