import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

export default function TextDetection() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log("Submitted text:", text);
  };

  return (
    <View className="flex-1 bg-black px-6 py-8">
      {/* Input Field */}
      <View className="mb-6">
        <Text className="text-white text-lg font-semibold mb-2">Share Your Mood</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type how you feel..."
          placeholderTextColor="#777"
          multiline
          numberOfLines={4}
          style={{
            backgroundColor: "#1e1e1e",
            color: "#fff",
            borderRadius: 5,
            padding: 12,
            height: 100,
            borderWidth: 1,
            borderColor: "#333",
            textAlignVertical: "top",
          }}
        />
      </View>

      {/* Submit Button */}
      <CustomButton
        text="Submit"
        backgroundColor="bg-primary"
        textColor="text-white"
        padding="py-3 px-6"
        borderStyle="rounded-full"
        containerStyle="mx-auto"
        onPress={handleSubmit}
      />
    </View>
  );
}
