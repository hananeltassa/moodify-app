import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useCameraMoodDetection } from "../../hooks/useCameraMoodDetection";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState(CameraType?.back || "front");
  const { cameraRef, loading, handleCapture } = useCameraMoodDetection();

  if (!permission) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-center text-lg mb-4">
          Loading camera permissions...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-center text-xl font-semibold mb-6">
          We need your permission
        </Text>
        <Text className="text-gray-400 text-center text-sm mb-6 px-8">
          Please allow camera access to use this feature and capture moments effortlessly.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-primary px-6 py-3 rounded-full shadow-lg"
        >
          <Text className="text-white text-center text-base font-medium">
            Grant Camera Access
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraType = () => {
    setCameraType((current) =>
      current === CameraType?.back ? CameraType?.front : CameraType?.back
    );
  };

  return (
    <View className="flex-1 bg-black relative">
      <View className="flex-1 mt-5">
        <CameraView
          ref={cameraRef}
          className="flex-1"
          style={{ aspectRatio: 9 / 16 }}
          facing={cameraType}
        >
          {/* Flip Camera Button */}
          <TouchableOpacity
            className="absolute top-10 right-5 bg-gray-800 bg-opacity-70 rounded-full p-3"
            onPress={toggleCameraType}
          >
            <Ionicons name="camera-reverse" size={20} color="white" />
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity
            className="absolute bottom-10 self-center w-20 h-20 bg-white rounded-full border-4 border-gray-800 shadow-lg"
            onPress={handleCapture}
          />
        </CameraView>
      </View>

      {/* Loading Overlay */}
      {loading && (
        <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
          <LottieView
            source={require("../../assets/loading-animation.json")}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text className="text-white text-lg mt-4">Uploading Image...</Text>
        </View>
      )}
    </View>
  );
}