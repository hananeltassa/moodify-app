import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import images from "../../constants/images";
import WeeklyProgress from "../../components/WeeklyProgress";
import RecommendedMusic from "../../components/RecommendedMusic";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const insets = useSafeAreaInsets(); // Get safe area insets for both Android and iOS
  const user = useSelector((state) => state.user.user);
  const profilePic = user?.profilePic;

  const weeklyData = [
    { day: "Mon", emoji: "😐" },
    { day: "Tues", emoji: "😔" },
    { day: "Wed", emoji: "🙂" },
    { day: "Thur", emoji: "😄" },
    { day: "Fri", emoji: "😐" },
    { day: "Sat", emoji: "😄" },
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
    {
      id: "3",
      title: "Belong Together",
      subtitle: "Mark Ambor",
      image: images.playlist,
    },
    {
      id: "4",
      title: "Dandelions",
      subtitle: "Ruth B.",
      image: images.playlist2,
    },
    {
      id: "5",
      title: "Belong Together",
      subtitle: "Mark Ambor",
      image: images.playlist,
    },
    {
      id: "6",
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
      <View style={{ marginLeft: 16, marginTop: 16 }}>
      <Image
        source={profilePic ? { uri: profilePic } : images.user}
        style={{
          width: 48,
          height: 48,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: "#FF6100",
        }}
        alt="Profile Picture"
      />
      </View>

      {/* Weekly Progress */}
      <View className="mt-2">
        <WeeklyProgress data={weeklyData} />
      </View>

      {/* Discover Your Mood Today */}
      <TouchableOpacity
        onPress={() => console.log("Navigate to Mood Input Options")}
        className="px-2 mt-6 rounded-xl"
        style={{ elevation: 5 }}
      >
        <LinearGradient
          colors={["#FF6100", "#FF4500"]}
          style={{ borderRadius: 16, height: 80 }}
        >
          <View className="flex-row items-center justify-between p-4">
            <View>
              <Text className="text-white text-2xl font-bold">
                Discover Your Mood Today
              </Text>
              <Text className="text-white text-base opacity-80 mt-2">
                Choose how you'd like to share your mood
              </Text>
            </View>
            <View className="flex-row space-x-3">
              {/* Voice Icon */}
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Image source={icons.voice} style={{ width: 24, height: 24, tintColor: "#FF6100" }} />
              </TouchableOpacity>
              {/* Text Icon */}
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Image source={icons.pen} style={{ width: 24, height: 24, tintColor: "#FF6100" }} />
              </TouchableOpacity>
              {/* Camera Icon */}
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Image source={icons.face} style={{ width: 24, height: 24, tintColor: "#FF6100" }} />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Recommended Music */}
      <View className="mt-4">
        <RecommendedMusic title="Recommended Music" data={musicData} />
      </View>
    </SafeAreaView>
  );
}
