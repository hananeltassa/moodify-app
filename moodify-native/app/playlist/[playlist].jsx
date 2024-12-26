import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import Music from "../../components/Music";

export default function Playlist() {
  const { playlist, playlistName } = useLocalSearchParams();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      {/* Back Button */}
      <View className="flex-row items-center mb-6 relative ">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute ml-4"
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <View className="flex-1 items-center">
          <Text className="text-white text-xl font-bold">Playlist</Text>
        </View>
      </View>

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
        onPress={() =>
          router.push({
            pathname: "/music/[music]",
            params: { music: "some-music", title: "Music Title" },
          })
          
        }
        onMorePress={() => console.log("More options pressed")}
      />
    </SafeAreaView>
  );
}
