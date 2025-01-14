import React, { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import LoadingScreen from "../../components/LoadingScreen";
import MoodResultModal from "../../components/MoodResultModal";
import { getToken } from "../../utils/secureStore";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export default function TextDetection() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [AIdescription, setAIdescription] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


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
        const { MoodDetection, AIdescription } = response.data;
  
        const parsedDescription = AIdescription? JSON.parse(AIdescription): "No description available";
  
        console.log("Detected mood:", MoodDetection.detected_mood);
        console.log("Confidence:", MoodDetection.confidence);
        console.log("AI description:", parsedDescription);
  
        setMood(MoodDetection.detected_mood);
        setConfidence(MoodDetection.confidence * 100);
        setAIdescription(parsedDescription); 
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

      {/* Mood Result Modal */}
      <MoodResultModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        mood={mood}
        confidence={confidence}
        AIdescription = {AIdescription}
      />
    </View>
  );
}
