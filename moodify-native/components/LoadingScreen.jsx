import React from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import animation from "../assets/loading-animation.json";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <View className="flex-auto justify-center items-center bg-black">
      {/* Lottie Animation */}
      <LottieView
        source={animation}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      {/* Loading Message */}
      <Text className="text-white mt-2 text-lg font-bold">{message}</Text>

    </View>
  );
}
