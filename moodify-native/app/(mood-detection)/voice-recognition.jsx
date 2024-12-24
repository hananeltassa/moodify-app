import React, { useState } from "react";
import { View, Text } from "react-native";
import { Audio } from "expo-av";
import CustomButton from "../../components/CustomButton";

export default function VoiceRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const startRecording = async () => {
    try {
      // Request microphone permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
        return;
      }
  
      // Configure the audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
  
      // Start recording
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording saved to", uri);
      setRecording(null);
      setIsRecording(false);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  return (
    <View className="justify-start mt-6 px-2">
      {/* Title */}
      <Text className="text-xl font-bold text-center mb-6">Voice Recognition</Text>

      {/* Voice Wave Placeholder */}
      <View className="flex items-center justify-center my-8">
        <View className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center">
          <Text className="text-lg font-bold text-gray-600">
            {isRecording ? "Listening..." : "Voice Wave"}
          </Text>
        </View>
      </View>

      {/* Start/Stop Button */}
      {!isRecording ? (
        <CustomButton
          text="Start Recording"
          backgroundColor="bg-blue-500"
          textColor="text-white"
          padding="py-3 px-6"
          marginTop="mt-4"
          width="w-40"
          borderStyle="border border-blue-500"
          containerStyle="mx-auto py-2 px-6"
          onPress={startRecording}
        />
      ) : (
        <CustomButton
          text="Stop Recording"
          backgroundColor="bg-red-500"
          textColor="text-white"
          padding="py-3 px-6"
          marginTop="mt-4"
          width="w-40"
          borderStyle="border border-red-500"
          containerStyle="mx-auto py-2 px-6"
          onPress={stopRecording}
        />
      )}

      {/* Cancel Button */}
      <CustomButton
        text="Cancel"
        backgroundColor="bg-gray-500"
        textColor="text-white"
        padding="py-3 px-6"
        marginTop="mt-4"
        width="w-40"
        borderStyle="border border-gray-500"
        containerStyle="mx-auto py-2 px-6"
        onPress={() => console.log("Cancelled")}
      />
    </View>
  );
}
