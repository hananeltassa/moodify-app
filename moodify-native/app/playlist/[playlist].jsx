import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import Music from "../../components/Music";

export default function Playlist() {
  const { playlist, playlistName } = useLocalSearchParams();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const insets = useSafeAreaInsets();

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
          backgroundColor: "black",
        }}
      >
        {/* Back Button */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
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
        <View className="flex-row items-center justify-between p-4 mb-2">
          <Text className="text-white text-2xl font-Avenir-Bold">{playlistName}</Text>
          <TouchableOpacity onPress={toggleLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={28}
              color={isLiked ? "#FF6100" : "#FFF"}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-1  mb-2">
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
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
