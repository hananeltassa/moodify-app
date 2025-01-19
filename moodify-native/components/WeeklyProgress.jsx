import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { fetchWeeklyProgress } from "@/api/user";

export default function WeeklyProgress() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const moodToEmoji = {
    happy: "😄",
    sad: "😔",
    neutral: "😐",
    angry: "😡",
    love: "🥰",
    fear: "😨",
    surprise: "😲",
  };

  useEffect(() => {
    const getWeeklyProgress = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWeeklyProgress();

        if (!data || data.length === 0) {
          setWeeklyData(null);
        } else {
          const transformedData = data.map((item) => ({
            day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
            emoji: moodToEmoji[item.most_common_mood] || "🙂",
          }));

          setWeeklyData(transformedData);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch weekly progress.");
      } finally {
        setLoading(false);
      }
    };

    getWeeklyProgress();
  }, []);

  if (loading) {
    return (
      <View className="p-4 bg-black">
        <ActivityIndicator size="large" color="#FF6100" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="p-4 bg-black">
        <Text className="text-white text-center text-sm">{error}</Text>
      </View>
    );
  }

  if (!weeklyData) {
    return;
  }

  return (
    <View className="p-4 bg-black">
      <Text className="text-white text-xl font-Avenir-Bold">Weekly Progress</Text>
      <View className="flex-row justify-between items-center h-24">
        {weeklyData.map((item, index) => (
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
