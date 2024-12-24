import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const commonScreenOptions = {
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: 'white',
    headerBackTitleVisible: false,
    headerTitleStyle: {
        fontFamily: "AvenirNextLTProBold", 
    },
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back('/detect-options')} style={{ marginLeft: 0 }}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    ),
};

export default function MoodDetectionLayout() {
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
        title: 'Discover your mood',
        ...commonScreenOptions,
        }}
       />
       <Stack.Screen
        name="image-recognition"
        options={{
        title: 'Discover your mood',
        ...commonScreenOptions,
        }}
       />
       <Stack.Screen
        name="voice-recognition"
        options={{
        title: 'Discover your mood',
        ...commonScreenOptions,
        }}
       />
    </Stack>
  );
}
