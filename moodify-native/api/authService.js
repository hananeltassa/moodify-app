import axios from "axios";
import { saveToken } from '../utils/secureStore';
import { BACKEND_BASE_URL } from "@env";


export const loginUser = async (email, password) =>{
    try{
        //console.log("Payload:", { email, password });
        const response = await axios.post(`${BACKEND_BASE_URL}/api/users/login`, 
          { email, password }
        );
        //console.log("API Response:", response.data);

        await saveToken('jwtToken', response.data.token);
        return response.data;
    } catch (error){
        // console.error("Error Details:", {
        //     message: error.message,
        //     response: error.response?.data,
        //     status: error.response?.status,
        //   });
        const errorMsg = error.response?.data?.error || "An unexpected error occurred.";
        throw new Error(errorMsg);
    }
}

export const registerUser = async (userData) => {
    try {
        const processedData = {
            ...userData,
            email: userData.email.toLowerCase(),
          };
        //console.log("Payload:", userData);
        const response = await axios.post(`${BACKEND_BASE_URL}/api/users/register`, 
          userData
        );
        //console.log("API Response:", response.data);
        await saveToken('jwtToken', response.data.token);
        return response.data;
    } catch (error) {
      console.error("Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMsg = error.response?.data?.error || "An unexpected error occurred.";
      throw new Error(errorMsg);
    }
};