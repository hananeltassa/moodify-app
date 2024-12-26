import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useSearchParams } from "expo-router";

export default function Playlist() {
  const { id } = useSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Playlist Details (ID: {id})
      </Text>
    </SafeAreaView>
  );
}
