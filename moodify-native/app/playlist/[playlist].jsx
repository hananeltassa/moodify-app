import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams  } from "expo-router";

export default function Playlist() {
  const { playlist } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Playlist Details: {playlist}
      </Text>
      {/* content for playlist  */}
    </SafeAreaView>
  );
}
