import { SafeAreaView, Text, View, Image } from "react-native";
import React from "react";
import images from "../../constants/images"; 
import WeeklyProgress from "../../components/WeeklyProgress";

export default function Home() {
  const profilePic = null;

  const weeklyData = [
    { day: "Mon", emoji: "😐" },
    { day: "Tues", emoji: "😔" },
    { day: "Wed", emoji: "🙂" },
    { day: "Thur", emoji: "😁" },
    { day: "Fri", emoji: "😐" },
    { day: "Sat", emoji: "😁" },
    { day: "Sun", emoji: "😔" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="left-4">
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : images.user
          }
          className="w-12 h-12 rounded-full border-2 border-white"
          alt="Profile Picture"
        />
      </View>

      <View className="">
        {/* WeeklyProgress Component */}
        <WeeklyProgress data={weeklyData} />
      </View>

    </SafeAreaView>
  );
}
