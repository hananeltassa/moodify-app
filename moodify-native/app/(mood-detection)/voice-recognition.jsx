import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import LoadingScreen from "../../components/LoadingScreen";
import MoodResultModal from "../../components/MoodResultModal";
import { useRecording } from "../../hooks/useRecording";

const { width } = Dimensions.get("window");

export default function VoiceRecognition() {
  const { isRecording, startRecording, stopRecording, discardRecording, uploadAudioFile } = useRecording();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mood, setMood] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const moodEmojis = {
    happy: "😊",
    sad: "🌧️",
    angry: "🥵",
    fear: "😟",
    surprise: "😲",
    love: "❤️",
  };

  const moodColors = {
    happy: "text-yellow-500",
    sad: "text-blue-400",
    angry: "text-red-500",
    fear: "text-purple-500",
    surprise: "text-pink-500",
    love: "text-red-400",
  };

  const toggleRecording = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        setLoading(true);
        try {
          const response = await uploadAudioFile(uri);
          if (response?.success) {
            setMood(response.MoodDetection.detected_mood);
            setConfidence(response.MoodDetection.confidence * 100);
            setShowModal(true);
          } else {
            console.error("Mood detection failed.");
          }
        } catch (error) {
          console.error("Error uploading audio:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No audio file found after recording stopped.");
      }
    } else {
      startRecording();
    }
  };

  const handleCancel = async () => {
    if (isRecording) {
      await discardRecording();
      console.log("Recording discarded");
    }
  };

  if (loading) {
    return <LoadingScreen message="Processing your mood..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      {/* Title */}
      <Text className="text-white text-2xl font-bold text-center mt-6">🎤 Speak Your Mood! 🎶</Text>

      {/* Interactive Circle */}
      <TouchableOpacity
        onPress={toggleRecording}
        activeOpacity={0.8}
        className="flex-1 justify-center items-center relative"
      >
        {isRecording ? (
          <LottieView
            source={require("../../assets/voice-animation.json")}
            autoPlay
            loop
            style={{
              width: width * 0.9,
              height: width * 0.9,
            }}
          />
        ) : (
          <View
            style={{
              width: width * 0.6,
              height: width * 0.6,
              borderRadius: width * 0.3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1e1e1e",
              borderWidth: 2,
              borderColor: "#FF6100",
              shadowColor: "#FF6100",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 15,
            }}
          >
            <Text className="text-white text-lg font-bold text-center">
              Tap to <Text className="text-[#FF6100]">Start</Text> Speaking!
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Cancel Button */}
      <View className="justify-center items-center mb-12">
        <TouchableOpacity
          onPress={handleCancel}
          className="bg-[#FF6100] w-16 h-16 rounded-full justify-center items-center"
        >
          <Entypo name="cross" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Mood Result Modal */}
      <MoodResultModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        mood={mood}
        confidence={confidence}
        moodEmojis={moodEmojis}
        moodColors={moodColors}
      />
    </SafeAreaView>
  );
}
