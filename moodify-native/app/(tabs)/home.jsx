import { SafeAreaView, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator,} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "../../constants/icons";
import images from "../../constants/images";
import WeeklyProgress from "../../components/WeeklyProgress";
import RecommendedMusic from "../../components/RecommendedMusic";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { searchSpotifyTracks } from "../../api/spotifyAuth";
import { searchJamendoMusic } from "../../api/jamendo";
import { getToken } from "../../utils/secureStore";

export default function Home() {
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);
  const profilePic = user?.profilePic;

  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSpotifyUser = !!user?.spotifyId;
  const mood = "calm"; // Predefined mood

  const fetchMusicRecommendations = async () => {
    setLoading(true);
    try {
      if (isSpotifyUser) {
        const jwtToken = await getToken("jwtToken");
        const spotifyResults = await searchSpotifyTracks(mood, jwtToken);

        if (spotifyResults) {
          setMusicData(
            spotifyResults.map((track, index) => ({
              id: track.id || `${track.name}-${index}`, // Fallback for unique keys
              title: track.name || "Unknown Title",
              subtitle: track.artists || "Unknown Artist",
              image: { uri: track.image || "https://via.placeholder.com/300" },
            }))
          );
        }
      } else {
        const jamendoResults = await searchJamendoMusic(mood);

        if (jamendoResults) {
          setMusicData(
            jamendoResults.map((track, index) => ({
              id: track.id || `${track.name}-${index}`, // Fallback for unique keys
              title: track.name || "Unknown Title",
              subtitle: track.artists || "Unknown Artist",
              image: { uri: track.image || "https://via.placeholder.com/300" },
            }))
          );
        }
      }
    } catch (error) {
      console.error("Error fetching music recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicRecommendations();
  }, []);

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
      </ScrollView>
    </SafeAreaView>
  );
}
