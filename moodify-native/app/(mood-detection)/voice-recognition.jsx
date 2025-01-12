import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import LoadingScreen from "../../components/LoadingScreen";
import { useRecording } from "../../hooks/useRecording";

const { width } = Dimensions.get("window");

export default function VoiceRecognition() {
  const { isRecording, startRecording, stopRecording, uploadAudioFile } = useRecording();
  const [loading, setLoading] = useState(false);

  const toggleRecording = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      console.log("Uploading audio...");
      if (uri) {
        setLoading(true);
        try {
          await uploadAudioFile(uri);
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
          onPress={() => console.log("Recording discarded")}
          className="bg-[#FF6100] w-16 h-16 rounded-full justify-center items-center"
        >
          <Entypo name="cross" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
