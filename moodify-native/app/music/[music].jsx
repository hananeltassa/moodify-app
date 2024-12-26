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

      {/* Song Info & Like Btn*/}
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

      {/* Progress Slider */}
      <View className="mb-4 px-10">
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FF6100"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FF6100"
          value={progress}
          onValueChange={(value) => setProgress(value)}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">0:38</Text>
          <Text className="text-white text-sm">1:18</Text>
        </View>
      </View>

      {/* Playback Controls */}
      <View className="flex-row items-center justify-evenly">
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pause-circle" size={80} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
