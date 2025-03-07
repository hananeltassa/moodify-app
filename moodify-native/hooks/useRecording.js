import { useState } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import { BACKEND_BASE_URL } from "@env";
import { getToken } from "../utils/secureStore";

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const recordingOptions = {
    android: {
      extension: ".wav",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Microphone access is required to use this feature. Please enable microphone permissions in your device settings.");
        return;
      }
  
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
  
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();
      setRecording(newRecording);
      setAudioFile(null);
      setIsRecording(true);
      console.log("Recording started");
    } catch (error) {
      if (error?.message?.includes("Session activation failed")) {
        alert(
          "Unable to start recording. The microphone is currently in use by another application. Please close any other apps using the microphone and try again."
        );
      } else {
        alert("An unexpected error occurred while starting the recording. Please restart the app and try again. If the issue persists, contact support.");
      }
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
          setAudioFile(uri); // Save the .wav file URI
          return uri;
        } else {
          //console.warn("No URI returned from recording.");
          setAudioFile(null); 
        }
      } else {
        console.warn("No recording instance found.");
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
      setAudioFile(null);
    } finally {
      setRecording(null);
      setIsRecording(false);
    }
  };

  const uploadAudioFile = async (fileUri) => {
    if (!fileUri) {
      //console.error("No audio file to upload");
      return null;
    }

    const formData = new FormData();
    formData.append("audio", {
      uri: fileUri,
      name: `audio_${Date.now()}.wav`,
      type: "audio/wav",
    });

    try {
      const token = await getToken("jwtToken");

      console.log("Uploading audio...");
      const response = await axios.post(`${BACKEND_BASE_URL}/api/mood/voice-mood`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      //console.log("Audio uploaded successfully:", response.data);
      return response.data; // Return the response data
    } catch (error) {
      //console.error("Error uploading audio:", error);
      return null; // Return null if an error occurs
    }
  };

  const discardRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        console.log("Recording discarded.");
      }
      setRecording(null);
      setAudioFile(null); // Clear the audio file state
    } catch (error) {
      console.error("Error discarding recording:", error);
    } finally {
      setIsRecording(false);
    }
  };

  return { isRecording, audioFile, startRecording, stopRecording, discardRecording, uploadAudioFile };
};
