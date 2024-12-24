import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import icons from "../../constants/icons";
import { router } from "expo-router";

export default function MoodDetection() {
  return (
    <SafeAreaView className="h-full  flex justify-between items-center">
      <View className="flex-1 w-full px-6 pt-16 items-center">
        {/* Title */}
        <Text className="text-3xl font-bold text-white mb-2 text-center">
          How are you feeling today?
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-gray-400 text-center mb-8">
          Choose how you'd like to share your mood
        </Text>

        {/* Buttons */}
        <View className="w-full space-y-4">
          <CustomButton
            icon={icons.voice}
            text="Record how you feel"
            backgroundColor="bg-white"
            textColor="text-black"
            fontFamily="AvenirNextLTProBold"
            borderStyle="border border-white"
            textSize="text-lg"
            marginTop="mt-4"
            borderWidth={0.5}
            onPress={() => router.push("/(mood-detection)/text-detection")}
          />
          <CustomButton
            icon={icons.face}
            text="Let your face do the talking"
            backgroundColor="bg-white"
            textSize="text-lg"
            textColor="text-black"
            fontFamily="AvenirNextLTProBold"
            borderStyle="border border-white"
            marginTop="mt-4"
            borderWidth={0.5}
            onPress={() => console.log("Face button pressed")}
          />
          <CustomButton
            icon={icons.pen}
            text="Type out how you feel"
            backgroundColor="bg-white"
            textSize="text-lg"
            textColor="text-black"
            fontFamily="AvenirNextLTProBold"
            borderStyle="border border-white"
            marginTop="mt-4"
            borderWidth={0.5}
            onPress={() => console.log("Text button pressed")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
