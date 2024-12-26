import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import Music from "../../components/Music";

export default function Playlist() {
  const { playlist, playlistName } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-4">

      {/* Playlist Image */}
      <View className="items-center mb-6">
        <Image
          source={images.playlist}
          className="w-96 h-96"
          resizeMode="contain"
        />
      </View>

      {/* Playlist Title and Like Icon */}
      <View className="pl-5 mb-2">
        <Text className="text-white text-2xl font-bold">{playlistName}</Text>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={28}
            color={isLiked ? "#FF6100" : "#FFF"}
          />
        </TouchableOpacity>
      </View>

      {/* Music Items */}
      <Music
        title="Belong Together"
        subtitle="Mark Ambor"
        image={images.playlist}
        onPress={() => console.log("Music item pressed")}
        onMorePress={() => console.log("More options pressed")}
      />
    </SafeAreaView>
  );
}
