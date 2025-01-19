import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { Alert } from "react-native";
import { getToken } from "../utils/secureStore";

export const useCameraMoodDetection = () => {
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: false,
        });

        console.log("Photo Captured", `Photo URI: ${photo.uri}`);
        return await uploadImageToBackend(photo.uri);

      } catch (error) {
        console.error("Error capturing photo:", error);
        Alert.alert("Error", "Something went wrong while capturing the photo.");
        return { success: false };
      }
    }
  };

  const uploadImageToBackend = async (uri) => {
    try {
      setLoading(true);
      const token = await getToken("jwtToken");

      const formData = new FormData();
      formData.append("image", {
        uri,
        name: `image_${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      const response = await axios.post(`${BACKEND_BASE_URL}/api/mood/image-mood`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      setLoading(false);
      console.log("Image uploaded successfully:", response.data);

      if (response.data.success) {
        const { detected_mood, confidence } = response.data.MoodDetection;
  
        return {
          success: true,
          mood: detected_mood,
          confidence,
        };
      } else {
        Alert.alert("Error", "Failed to detect mood. Please try again.");
        return { success: false };
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading photo:", error);
      Alert.alert("Error", "Failed to upload photo. Please try again.");
      return { success: false };
    }
  };

  return {
    cameraRef,
    loading,
    handleCapture,
  };
};
