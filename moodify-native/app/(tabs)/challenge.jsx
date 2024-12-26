import React from "react";
import { View, Text, ScrollView } from "react-native";
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
  const handleChallengeAction = (id) => {
    console.log(`Challenge ${id} action triggered`);
  };

  return (
    <ScrollView className="flex-1 bg-black px-4 py-6">
      {/* Title */}
      <Text className="text-white font-bold text-3xl mb-2">
        Challenges <Text className="text-yellow-500">🏆</Text>
      </Text>
      <Text className="text-gray-300 text-base mb-6">
        Ready to conquer today's challenges, Hanan?
      </Text>

      {/* Subtitle */}
      <Text className="text-white font-semibold text-lg mb-4">
        Today's AI Coach Challenges <Text className="text-yellow-500">🏆</Text>
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
  );
}
