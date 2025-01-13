import React from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator,} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";
import WeeklyProgress from "@/components/WeeklyProgress";
import RecommendedMusic from "@/components/RecommendedMusic";
import useMusicRecommendations from "@/hooks/useMusicRecommendations";
import usePersonalizedRecommendations from "@/hooks/usePersonalizedRecommendations";


export default function Home() {
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);
  const mood = useSelector((state) => state.mood.mood);
  const profilePic = user?.profilePic;

  const isSpotifyUser = !!user?.spotifyId;

  const moodToMusicQuery = {
    happy: "feel-good anthems",
    sad: "comforting acoustic ballads",
    disgust: "calming ambient sounds",
    neutral: "chill background music",
    angry: "relaxing lo-fi beats",
    fear: "peaceful piano instrumentals",
    surprise: "energetic pop hits",
    love: "romantic love songs",
  };

  const moodQuery = moodToMusicQuery[mood] || 'music trend';
  
  const { musicData, loading } = useMusicRecommendations(moodQuery, isSpotifyUser);
  const { personalizedData, personalizedLoading } = usePersonalizedRecommendations(moodQuery);
  const weeklyData = [
    { day: "Mon", emoji: "😐" },
    { day: "Tues", emoji: "😔" },
    { day: "Wed", emoji: "🙂" },
    { day: "Thur", emoji: "😄" },
    { day: "Fri", emoji: "😐" },
    { day: "Sat", emoji: "😄" },
    { day: "Sun", emoji: "😔" },
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
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
        <TouchableOpacity className="px-2 mt-6 rounded-xl" style={{ elevation: 5 }}>
          <LinearGradient
            colors={["#FF6100", "#FF4500"]}
            style={{
              borderRadius: 16,
              height: 120,
              paddingHorizontal: 16,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text className="text-white text-2xl font-Avenir-Bold">Discover Your Mood Today</Text>
              <Text className="text-white text-sm opacity-80 mt-2">
                Choose how you'd like to share your mood
              </Text>
            </View>

            <View className="flex-row items-center justify-center" style={{ gap: 6 }}>
              <TouchableOpacity
                className="bg-white p-3 items-center justify-center rounded-full"
                onPress={() => router.push("/(mood-detection)/voice-recognition")}
              >
                <Image
                  source={icons.voice}
                  style={{ width: 24, height: 24, tintColor: "#FF6100" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white p-3 items-center justify-center rounded-full"
                onPress={() => router.push("/(mood-detection)/text-detection")}
              >
                <Image
                  source={icons.pen}
                  style={{ width: 24, height: 24, tintColor: "#FF6100" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-white p-3 items-center justify-center rounded-full"
                onPress={() => router.push("/(mood-detection)/image-recognition")}
              >
                <Image
                  source={icons.face}
                  style={{ width: 24, height: 24, tintColor: "#FF6100" }}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Recommended Music */}
        <View className="mt-4">
          {loading ? (
            <ActivityIndicator size="large" color="#FF6100" style={{ marginVertical: 20 }} />
          ) : (
            <RecommendedMusic title="Recommended Music" data={musicData} />
          )}
        </View>

        {/* Personalized Recommendations Section */}
        <View className="mt-3">
          {personalizedLoading ? (
            <ActivityIndicator size="large" color="#FF6100" style={{ marginVertical: 20 }} />
          ) : (
            <RecommendedMusic title={`For You`} data={personalizedData.tracks} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}