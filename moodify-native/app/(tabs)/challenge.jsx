import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ChallengeCard from "../../components/Challenge/ChallengeCard";
import { getValidChallenges, createChallengeForCurrentTime } from "../../utils/challengeUtils";
import { useSelector } from "react-redux";
import { updateChallengeStatus } from "../../api/challengeApi";

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  const name = user?.name;

  useEffect(() => {
    const manageDailyChallenges = async () => {
      try {
        // Fetch and filter valid challenges
        const validChallenges = await getValidChallenges();
        setChallenges(validChallenges);

        // If no valid challenges exist, create two new challenges
        if (validChallenges.length === 0) {
          const newChallenges = await createChallengeForCurrentTime();
          setChallenges(newChallenges);
        }
      } catch (error) {
        console.error("Error managing daily challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    manageDailyChallenges();
  }, []);

  const handleChallengeAction = async (id, isDone) => {
    try {
      const newStatus = isDone ? "completed" : "pending";
      await updateChallengeStatus(id, newStatus);

      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.id === id ? { ...challenge, status: newStatus } : challenge
        )
      );

      console.log(`Challenge ${id} updated to status: ${newStatus}`);
    } catch (error) {
      console.error(`Error updating challenge ${id}:`, error.message || error);
    }
  };

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

          {/* Loader */}
          {loading && <ActivityIndicator size="large" color="#FF6100" style={{ marginVertical: 20 }} />}

          {/* Challenge Cards */}
          {!loading &&
            challenges.map((challenge) => (
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

          {!loading && challenges.length === 0 && (
            <Text className="font-avenir-regular text-gray-400 text-center">
              No challenges available. Come back later!
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
