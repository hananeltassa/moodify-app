import { createChallenge, fetchChallenges } from "../api/challengeApi";
import dayjs from "dayjs";

/**
 * Fetch challenges and filter valid ones created within the last 12 hours.
 * @returns {Array} List of valid challenges.
 */
export const getValidChallenges = async () => {
  const fetchedChallenges = await fetchChallenges();
  const eightHoursAgo = dayjs().subtract(8, "hours");
  //console.log("Current time:", dayjs().toISOString());
  //console.log("8 hours ago:", eightHoursAgo.toISOString());

  const validChallenges = fetchedChallenges.filter((challenge) => {
    const createdAt = dayjs(challenge.createdAt);
    //console.log(`Challenge ${challenge.id} createdAt:`, createdAt.toISOString());
    //console.log(`Is after 8 hours ago:`, createdAt.isAfter(eightHoursAgo));
    return createdAt.isAfter(eightHoursAgo);
  });

  //console.log("Valid challenges:", validChallenges);
  return validChallenges;
};

/**
 * Create two challenges based on the current time of day.
 * @returns {Array} The created challenges.
 */
export const createChallengeForCurrentTime = async (mood) => {
  const fallbackMood = mood || "neutral";
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
    const challenge1 = await createChallenge(fallbackMood, timeOfDay);
    const challenge2 = await createChallenge("motivated", timeOfDay);
    return [challenge1, challenge2];
  } catch (error) {
    console.error(`Error creating challenges for ${timeOfDay}:`, error);
    throw error;
  }
};
