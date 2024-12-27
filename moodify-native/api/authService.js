import axios from "axios";

const API_URL="http://11.11.11.12:8080/api/users/";

export const loginUser = async (email, password) =>{
    try{
        console.log("Payload:", { email, password });
        const response = await axios.post(`http://11.11.11.12:8080/api/users/login`, { email, password });
        console.log("API Response:", response.data);
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