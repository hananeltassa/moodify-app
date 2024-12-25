import React from "react";
import { Text, View } from "react-native";

export default function WeeklyProgress({ data }) {
  return (
    <View className="p-4 bg-black">
      <Text className="text-white text-xl font-Avenir-Bold">Weekly Progress</Text>
      <View className="flex-row justify-between items-center h-24">
        {data.map((item, index) => (
          <View key={index} className="items-center">
            <Text className="text-5xl" style={{ lineHeight: 64 }}>
              {item.emoji}
            </Text>
            <Text className="text-white text-s font-avenir-regular">{item.day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
