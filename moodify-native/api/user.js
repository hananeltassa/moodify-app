import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { getToken } from '../utils/secureStore';

export const updateUserProfile = async(userData) => {
    try {
        const token = await getToken("jwtToken");

        if (!token) {
            throw new Error("No token found. Please log in again.");
        }

        //console.log("Sending request to update profile:", userData);

        const response = await axios.put(`${BACKEND_BASE_URL}/api/users/profile`,
            userData,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}


export const fetchWeeklyProgress = async () => {
  try {
    const token = await getToken("jwtToken");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await axios.get(`${BACKEND_BASE_URL}/api/mood/average-mood`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error("Error fetching weekly progress:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
