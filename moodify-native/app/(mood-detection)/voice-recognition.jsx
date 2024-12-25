import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

export default function VoiceRecognition() {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    console.log("Recording started");
    setIsRecording(true);
  };

  const stopRecording = () => {
    console.log("Recording stopped");
    setIsRecording(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 16 }}>
      {/* Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 48,
          position: "relative",
        }}
      >
        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => console.log("Cancelled")}
          style={{
            backgroundColor: "#D32F2F",
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
          onPress={isRecording ? stopRecording : startRecording}
          style={{
            backgroundColor: isRecording ? "#D32F2F" : "#1976D2",
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
