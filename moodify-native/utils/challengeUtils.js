import { createChallenge, fetchChallenges } from "../api/challengeApi";
import dayjs from "dayjs";

/**
 * Fetch challenges and filter valid ones created within the last 12 hours.
 * @returns {Array} List of valid challenges.
 */
export const getValidChallenges = async () => {
  const fetchedChallenges = await fetchChallenges();

  const twelveHoursAgo = dayjs().subtract(12, "hours");
  const validChallenges = fetchedChallenges.filter((challenge) => {
    const createdAt = dayjs(challenge.created_at);
    return createdAt.isAfter(twelveHoursAgo);
  });

  return validChallenges;
};

/**
 * Create two challenges based on the current time of day.
 * @returns {Array} The created challenges.
 */
export const createChallengeForCurrentTime = async () => {
  const currentTime = dayjs();
  let timeOfDay;

  if (currentTime.hour() < 12) {
    timeOfDay = "morning";
  } else if (currentTime.hour() < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "night";
  }

  console.log(`Creating challenges for: ${timeOfDay}`);
  try {
    const challenge1 = await createChallenge("neutral", timeOfDay);
    const challenge2 = await createChallenge("motivated", timeOfDay);
    return [challenge1, challenge2];
  } catch (error) {
    console.error(`Error creating challenges for ${timeOfDay}:`, error);
    throw error;
  }
};
