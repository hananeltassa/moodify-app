import { SafeAreaView, Text, View, Image } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../constants/images"; 
import WeeklyProgress from "../../components/WeeklyProgress";
import RecommendedMusic from "../../components/RecommendedMusic";

export default function Home() {
  const insets = useSafeAreaInsets(); // Get safe area insets for both Android and iOS
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

  const musicData = [
    {
      id: "1",
      title: "Belong Together",
      subtitle: "Mark Ambor",
      image: images.playlist,
    },
    {
      id: "2",
      title: "Dandelions",
      subtitle: "Ruth B.",
      image: images.playlist2,
    },
  ];
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {/* Profile Picture */}
      <View style={{ marginLeft: 16 }}>
        <Image
          source={profilePic ? { uri: profilePic } : images.user}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: "white",
          }}
          alt="Profile Picture"
        />
      </View>

      {/* Weekly Progress */}
      <View style={{ marginTop: 16 }}>
        <WeeklyProgress data={weeklyData} />
      </View>

      <View>
        <RecommendedMusic title="Recommended Music" data={musicData} />
      </View>
    </SafeAreaView>
  );
}
