import React from "react";
import { Stack } from "expo-router";

export default function MoodDetectionLayout() {
  return (
    <Stack>
      {/* Define the detect-options screen */}
      <Stack.Screen
        name="detect-options"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
