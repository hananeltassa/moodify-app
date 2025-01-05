import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

// Create a new playlist
export const createPlaylist = async (jwtToken, name, isDefault = false) => {
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/api/playlists`,
      { name, isDefault },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    console.log("Created playlist:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};