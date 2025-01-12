import { useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
      console.log("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        console.log("Stopping recording...");
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) {
          console.log("Recording URI:", uri);
          setAudioFile(uri);
        } else {
          console.warn("No URI returned from recording.");
        }
      } else {
        console.warn("No recording instance found.");
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      setRecording(null);
      setIsRecording(false);
    }
  };

  const discardRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        console.log("Recording discarded");
      }
    } catch (error) {
      console.error("Error discarding recording:", error);
    } finally {
      setRecording(null);
      setIsRecording(false);
      setAudioFile(null);
    }
  };

  const uploadAudioFile = async () => {
    if (!audioFile) {
      console.error("No audio file to upload");
      return;
    }

    try {
      // Ensure the file exists
      const fileInfo = await FileSystem.getInfoAsync(audioFile);
      if (!fileInfo.exists) {
        console.error("File does not exist at URI:", audioFile);
        return;
      }

      // Create FormData for upload
      const formData = new FormData();
      formData.append("audio", {
        uri: audioFile,
        name: `audio_${Date.now()}.m4a`,
        type: "audio/m4a",
      });

      console.log("Uploading audio...");
      const response = await axios.post(`${BACKEND_BASE_URL}/api/mood/voice-mood`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Audio uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return { isRecording, audioFile, startRecording, stopRecording, discardRecording, uploadAudioFile };
};
