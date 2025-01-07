import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { getToken } from "../utils/secureStore";

const getAuthHeaders = async () => {
  const token = await getToken("jwtToken");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const createChallenge = async (mood, timeOfDay) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post(`${BACKEND_BASE_URL}/create-challenge`,
      { mood, time_of_day: timeOfDay },
      headers
    );
    return response.data.challenge;
  } catch (error) {
    console.error("Error creating challenge:", error.message || error.response?.data || error);
    throw error;
  }
};
