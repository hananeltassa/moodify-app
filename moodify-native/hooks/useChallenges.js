import { useState, useEffect } from "react";
import { getValidChallenges, createChallengeForCurrentTime } from "@/utils/challengeUtils";
import { updateChallengeStatus } from "@/api/challengeApi";

export const useChallenges = (mood) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch and manage challenges
  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const validChallenges = await getValidChallenges();
      if (validChallenges.length > 0) {
        setChallenges(validChallenges);
      } else {
        const newChallenges = await createChallengeForCurrentTime(mood);
        setChallenges(newChallenges);
      }
    } catch (error) {
      console.error("Error managing daily challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update challenge status
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

  // Fetch challenges on mount
  useEffect(() => {
    fetchChallenges();
  }, [mood]);

  return { challenges, loading, handleChallengeAction };
};
