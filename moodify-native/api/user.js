import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const updateUserProfile = async(userData) => {
    try {
        const response = await axios.put(`${BACKEND_BASE_URL}/api/user/profile`,
            userData,
        );

        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
}