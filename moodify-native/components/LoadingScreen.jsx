import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text className="text-white mt-4">{message}</Text>
    </View>
  );
}
