import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

export default function VoiceRecognition() {
  // State for recording
  const [isRecording, setIsRecording] = useState(false);

  // Animation states
  const pulse1 = useState(new Animated.Value(1))[0];
  const pulse2 = useState(new Animated.Value(1))[0];
  const opacity1 = useState(new Animated.Value(0.8))[0];
  const opacity2 = useState(new Animated.Value(0.8))[0];

  // Animation functions
  const startWaveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulse1, {
            toValue: 2,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity1, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulse2, {
            toValue: 2,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity2, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const stopWaveAnimation = () => {
    pulse1.setValue(1);
    pulse2.setValue(1);
    opacity1.setValue(0.8);
    opacity2.setValue(0.8);
  };

  // Toggle recording with animation
  const toggleRecording = () => {
    if (!isRecording) {
      startWaveAnimation();
    } else {
      stopWaveAnimation();
    }
    setIsRecording(!isRecording);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 16 }}>
      {/* Title */}
      <View style={{ marginTop: 48 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          🎤 Speak Your Mood! 🎶
        </Text>
      </View>

      {/* Animated Circles */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "#FF6100",
            opacity: opacity1,
            transform: [{ scale: pulse1 }],
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "#B90039",
            opacity: opacity2,
            transform: [{ scale: pulse2 }],
          }}
        />

        {/* Inner Circle */}
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: isRecording ? "#FF6100" : "#B90039",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {isRecording ? "Listening..." : "Tap to Start"}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 48, position: "relative" }}>
        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => console.log("Cancelled")}
          style={{
            backgroundColor: "#FF6100",
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: 32,
          }}
        >
          <Entypo name="cross" size={30} color="white" />
        </TouchableOpacity>

        {/* Record Button */}
        <TouchableOpacity
          onPress={toggleRecording}
          style={{
            backgroundColor: isRecording ? "#B90039" : "#FF6100",
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name={isRecording ? "stop" : "fiber-manual-record"}
            size={40}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
