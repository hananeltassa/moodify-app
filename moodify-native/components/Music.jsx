import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Music({ title, subtitle, image, onPress, onMorePress }) {
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
          width: 60,
          height: 60,
          resizeMode: "cover",
        }}
      />

      {/* Text Content */}
      <View className="flex-1">
        <Text className="text-white text-lg font-Avenir-Demi">
          {title}
        </Text>
        <Text className="text-gray-400 text-base">
          {subtitle}
        </Text>
      </View>

      {/* Three Dots Icon */}
      <TouchableOpacity onPress={onMorePress}>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color="#7B7B8B"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
