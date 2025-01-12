import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const searchJamendoMusic = async (query, type = "tracks") => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/music/search`, {
      params: { query, type },
    });
    //console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error searching Jamendo music:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch Jamendo results.");
  }
};
