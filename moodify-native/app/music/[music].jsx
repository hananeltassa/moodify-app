import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Music() {
  const { music, title } = useLocalSearchParams(); 

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold">Music: {music}</Text>
      <Text className="text-gray-400 text-lg mt-2">Title: {title}</Text>
    </SafeAreaView>
  );
}
