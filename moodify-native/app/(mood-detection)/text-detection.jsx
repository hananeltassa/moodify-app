import React, { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import { getToken } from "../../utils/secureStore";
import axios from "axios";

export default function TextDetection() {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter some text.");
      return;
    }

    try {
      const token = await getToken("jwtToken");
      console.log("Retrieved Token:", token);

      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      console.log("Making API call to detect mood...");
      const response = await axios.post(`http://11.11.11.12:8080/api/mood/text-mood`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //console.log("API Response:", response.data);
      const { mood, confidence } = response.data;
      Alert.alert("Mood Detected", `Mood: ${mood}\nConfidence: ${confidence}`);
    } catch (err) {
      console.error("Error detecting mood:", err);

      if (err.response) {
        console.error("Backend Error Response:", err.response.data);
        Alert.alert(
          "Error",
          `Failed to detect mood: ${err.response.data.error || "Unknown error"}`
        );
      } else {
        Alert.alert("Error", "Failed to detect mood. Please try again.");
      }
    }
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
