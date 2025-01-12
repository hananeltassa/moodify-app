import React, { useState } from "react";
import { View, TextInput, Text, Modal, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import LoadingScreen from "../../components/LoadingScreen";
import { getToken } from "../../utils/secureStore";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function TextDetection() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const moodEmojis = {
    joy: "😊",
    sadness: "🌧️",
    anger: "🥵",
    fear: "😟",
    surprise: "😲",
    love: "❤️",
  };

  const moodColors = {
    joy: "text-yellow-500",
    sadness: "text-blue-400",
    anger: "text-red-500",
    fear: "text-purple-500",
    surprise: "text-pink-500",
    love: "text-red-400",
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter some text.");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken("jwtToken");

      if (!token) {
        setLoading(false);
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_BASE_URL}/api/mood/text-mood`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const { detected_mood, confidence } = response.data.MoodDetection;

        setMood(detected_mood);
        setConfidence(confidence * 100);
        setShowModal(true);
      } else {
        Alert.alert("Error", "Failed to detect mood. Please try again.");
      }
    } catch (err) {
      console.error("Error detecting mood:", err);
      Alert.alert("Error", "Failed to detect mood. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Detecting your mood..." />;
  }

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
          className="bg-[#1e1e1e] text-white rounded-lg p-3 h-24 border border-gray-800 text-base"
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

      {/* Joyful Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-lg p-6 w-4/5 items-center shadow-lg relative">
            {/* Close Button (X in top-right) */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <Text className="text-black text-lg font-bold">✕</Text>
            </TouchableOpacity>

            {/* Emoji Header */}
            <Text className={`text-6xl mb-4 p-2 ${moodColors[mood] || "text-black"}`}>
              {moodEmojis[mood] || "🌈"}
            </Text>

            {/* Circular Progress */}
            <AnimatedCircularProgress
              size={150}
              width={12}
              fill={confidence}
              tintColor="#FFA500"
              backgroundColor="#f5f5f5"
              style={{ marginBottom: 16 }}
            >
              {(fill) => (
                <Text className="text-2xl font-bold text-black">{`${Math.round(fill)}%`}</Text>
              )}
            </AnimatedCircularProgress>

            {/* Mood Message */}
            <Text className="text-gray-700 text-lg mt-4 text-center">
              Your mood is:{" "}
              <Text className="font-bold capitalize">{mood || "unique"}</Text>
            </Text>

            {/* Button for Song Suggestions */}
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                console.log("Navigate to song suggestions!");
              }}
              className="mt-4 bg-primary px-4 py-2 rounded-full shadow-sm"
            >
              <Text className="text-white font-medium text-center text-sm">
                Let's see what song suggestions you have
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
