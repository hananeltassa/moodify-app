import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity,Platform  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import images from "@/constants/images";

export default function SongPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const toggleLike = () => {
    setIsLiked(!isLiked);
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
          source={{ uri: "https://via.placeholder.com/300" }}
          style={{ width: 400, height: 400 }}
        />
      </View>


      {/* Song Info & Like Button */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View className="flex-row items-center justify-between">
          {/* Song Title and Artist */}
          <View>
            <Text className="text-white text-2xl font-bold">Wildest Dreams</Text>
            <Text className="text-gray-400 text-lg">Taylor Swift</Text>
          </View>

          {/* Like Button */}
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={32}
              color={isLiked ? "#FF6100" : "white"}
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
          onValueChange={(value) => setProgress(value)}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">0:38</Text>
          <Text className="text-white text-sm">1:18</Text>
        </View>
      </View>

      {/* Playback Controls */}
      <View className="flex-row items-center justify-evenly mb-10">
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
