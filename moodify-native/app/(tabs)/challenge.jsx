import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ChallengeCard from "../../components/ChallengeCard";

const mockChallenges = [
  {
    id: 1,
    title: "Stretch for 10 minutes indoors!",
    description:
      "Warm up your body with gentle stretches to release tension and boost your energy on this cold day.",
    tags: ["Mindfulness", "Fitness"],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Hydrate Yourself!",
    description: "Drink a glass of water to stay hydrated and refreshed.",
    tags: ["Wellness", "Health"],
    image: "https://via.placeholder.com/150",
  },
];

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();

  const handleChallengeAction = (id) => {
    console.log(`Challenge ${id} action triggered`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: "black",
        }}
      >
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          {/* Title */}
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">
            Challenges <Text style={{ color: "#FFD700" }}>🏆</Text>
          </Text>
          <Text className="font-avenir-regular text-gray-400 text-sm mb-4">
            Ready to conquer today's challenges, Hanan?
          </Text>

          {/* Subtitle */}
          <Text className="font-Avenir-Bold text-white text-xl mb-4" >
            Today's AI Coach Challenges <Text style={{ color: "#FFD700" }}>🏆</Text>
          </Text>

          {/* Challenge Cards */}
          {mockChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              tags={challenge.tags}
              image={challenge.image}
              onAction={() => handleChallengeAction(challenge.id)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
