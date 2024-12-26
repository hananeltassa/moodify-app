import React from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import images from "@/constants/images";
import Music from "../../components/Music";

export default function Playlist() {
  const { playlist } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      {/* Playlist Title */}
      <Text className="text-white text-xl font-bold mb-4">
        Playlist Details: {playlist}
      </Text>

      <View className=" items-center">
        <Image
          source={images.playlist}
          className="w-96 h-96"
          resizeMode="contain" 
        />
        
      </View>
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
