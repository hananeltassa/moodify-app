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

    //console.log("Created playlist:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    //console.error("Error creating playlist:", error);
    throw error;
  }
};

// Get all playlists for the authenticated user
export const getUserPlaylists = async (jwtToken) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/playlists`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      //console.warn("No playlists found. Returning an empty array.");
      return { playlists: [] };
    }
    //console.error("Error fetching playlists:", error);
    throw error;
  }
};


// Add a song to a playlist
export const addSongToPlaylist = async (jwtToken, playlistId, source, externalId, metadata) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/playlists/${playlistId}/songs`,
      { source, externalId, metadata },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    //console.log("Added song to playlist:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    //console.error("Error adding song to playlist:", error);
    throw error;
  }
};

// Get songs in a playlist
export const getPlaylistSongs = async (jwtToken, playlistId) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/playlists/${playlistId}/songs`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    //console.log("Fetched songs in playlist:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Invalid token or session expired.");
    } else if (error.response?.status === 404) {
      console.error("Playlist not found.");
    }
    console.error("Error fetching playlist songs:", error);
    throw error;
  }
};

// Delete a song from a playlist
export const deleteSongFromPlaylist = async (jwtToken, playlistId, songTitle) => {
  try {
    const response = await axios.delete(`${BACKEND_BASE_URL}/api/playlists/${playlistId}/songs/${encodeURIComponent(songTitle)}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    //console.log("Deleted song from playlist:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error deleting song from playlist:", error);
    throw error;
  }
};
