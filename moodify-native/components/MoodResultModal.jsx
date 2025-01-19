import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useRouter } from "expo-router";
import { useDispatch } from 'react-redux';
import { setMood } from '../redux/slices/moodSlice';


export default function MoodResultModal({ visible, onClose, mood, confidence, AIdescription}) {
  const router = useRouter();
  const dispatch = useDispatch(); 

  const moodEmojis = {
    happy: "😊",
    sad: "🌧️",
    disgust: "😣", 
    neutral: "😄",
    angry: "🥵",
    fear: "😟",
    surprise: "😲",
    love: "❤️",
  };
  
  const moodColors = {
    happy: "text-yellow-500",
    sad: "text-blue-400",
    disgust: "text-pink-500", 
    neutral: "text-pink-500",
    angry: "text-red-500",
    fear: "text-purple-500",
    surprise: "text-pink-500",
    love: "text-red-400",
  };
  //console.log("Mood:", mood, "AI Description:", AIdescription);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-lg p-6 w-4/5 items-center shadow-lg relative">
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
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
            onPress={() =>{
              dispatch(setMood({ mood, AIdescription }));
              router.push({
                pathname: "/(mood-detection)/recommendedPlaylist",
              })
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
  );
}
