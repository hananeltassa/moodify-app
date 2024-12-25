import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function LibraryItem({ title, subtitle, image, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-[#1E1E2E] p-5 mb-4"
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
        <Text className="text-gray-400 text-base mt-2">
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
