import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ChallengeCard from "../../components/Challenge/ChallengeCard";
import { createChallenge, fetchChallenges } from "../../api/challengeApi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export default function ChallengeScreen() {
  const insets = useSafeAreaInsets();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  const name = user?.name;

  useEffect(() => {
    const manageDailyChallenges = async () => {
      try {
        const fetchedChallenges = await fetchChallenges();

        const validChallenges = fetchedChallenges.filter((challenge) => {
          const createdAt = dayjs(challenge.created_at);
          return dayjs().diff(createdAt, "hour") < 24;
        });

        setChallenges(validChallenges);

        if (validChallenges.length === 0) {
          await createDailyChallenges();
        }
      } catch (error) {
        console.error("Error managing daily challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    manageDailyChallenges();
  }, []);

  const createDailyChallenges = async () => {
    const timesOfDay = ["morning", "afternoon", "night"];

    try {
      const newChallenges = [];
      for (const timeOfDay of timesOfDay) {
        const challenge = await createChallenge("neutral", timeOfDay);
        newChallenges.push(challenge);
      }
      setChallenges(newChallenges);
    } catch (error) {
      console.error("Error creating daily challenges:", error);
    }
  };

  const handleChallengeAction = async (id) => {
    console.log(`Challenge ${id} action triggered`);
    // Additional logic for handling actions on challenges
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
                title={challenge.text.title}
                description={challenge.text.description}
                tags={challenge.text.hashtags}
                onAction={() => handleChallengeAction(challenge.id)}
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
