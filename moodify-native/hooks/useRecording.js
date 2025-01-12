import { useState } from "react";
import { Audio } from "expo-av";

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
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioFile(uri);
        console.log("Recording saved at:", uri);
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
        await recording.stopAndUnloadAsync(); // Stop the recording
        console.log("Recording discarded");
      }
    } catch (error) {
      console.error("Error discarding recording:", error);
    } finally {
      setRecording(null);
      setIsRecording(false);
      setAudioFile(null); // Ensure the audio file is not saved
    }
  };

  return { isRecording, audioFile, startRecording, stopRecording, discardRecording };
};
