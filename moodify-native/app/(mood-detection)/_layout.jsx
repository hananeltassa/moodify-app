import React from "react";
import { Stack, useRouter } from "expo-router"; 
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MoodDetectionLayout() {
  const router = useRouter(); 

  const commonScreenOptions = {
    headerStyle: { backgroundColor: "black" },
    headerTintColor: "white",
    headerBackTitleVisible: false,
    headerTitleStyle: {
      fontFamily: "AvenirNextLTProBold",
      fontSize: 19,
    },
    headerTitleAlign: "center",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginLeft: 0 }}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    ),
  };

  return (
    <Stack>
      <Stack.Screen
        name="detect-options"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="text-detection"
        options={{
          title: "Tell Us How You Feel",
          ...commonScreenOptions,
        }}
      />
      <Stack.Screen
        name="image-recognition"
        options={{
          title: "Mirror Your Feelings",
          ...commonScreenOptions,
        }}
      />
      <Stack.Screen
        name="voice-recognition"
        options={{
          title: "Let Your Voice Be Heard",
          ...commonScreenOptions,
        }}
      />
    </Stack>
  );
}
