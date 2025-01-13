import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ChallengeCard from "@/components/Challenge/ChallengeCard";
import LoadingScreen from "@/components/LoadingScreen";
import { useChallenges } from "@/hooks/useChallenges";
import { useSelector } from "react-redux";

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);
  const mood = useSelector((state) => state.mood.mood);

  const name = user?.name;

  const { challenges, loading, handleChallengeAction } = useChallenges(mood);

  if (loading) {
    return <LoadingScreen message="Fetching your challenges..." />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: insets.bottom,
          backgroundColor: "black",
          paddingHorizontal: 16,
        }}
      >
        <ScrollView>
          {/* Title */}
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">
            Challenges <Text style={{ color: "#FF6100" }}>🏆</Text>
          </Text>
          <Text className="font-avenir-regular text-gray-400 text-sm mb-4">
            Ready to conquer today's challenges, {name}?
          </Text>

          {/* Subtitle */}
          <Text className="font-Avenir-Bold text-white text-xl mb-4">
            Today's AI Coach Challenges <Text style={{ color: "#FF6100" }}>🔥</Text>
          </Text>

          {/* Challenge Cards */}
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.text.title}
              description={challenge.text.description}
              tags={challenge.text.hashtags}
              status={challenge.status}
              onAction={handleChallengeAction}
            />
          ))}

          {challenges.length === 0 && (
            <Text className="font-avenir-regular text-gray-400 text-center">
              No challenges available. Come back later!
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
