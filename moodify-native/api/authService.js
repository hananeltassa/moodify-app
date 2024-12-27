import axios from "axios";

const API_URL="http://localhost:8080/api/users";

export const loginUser = async (email, password) =>{
    try{
        const response = await axios.post(`${API_URL}/login`, { email, password });

        return response.data;
    } catch (error){
        const errorMsg = error.response?.data?.error || "An unexpected error occurred.";
        throw new Error(errorMsg);
    }
}