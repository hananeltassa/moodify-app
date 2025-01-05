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

// Get all playlists for the authenticated user
export const getUserPlaylists = async (jwtToken) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/playlists`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    console.log("Fetched playlists:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};
