import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Playlist({ title, subtitle, image, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-2"
    >
      {/* Thumbnail */}
      <Image
        source={image}
        className="mr-4"
        style={{
          width: 64,
          height: 64,
          resizeMode: "cover",
        }}
      />

      {/* Text Content */}
      <View className="flex-1">
        <Text className="text-white text-lg font-Avenir-Bold">
          {title}
        </Text>
        <Text className="text-gray-400 text-base">
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
