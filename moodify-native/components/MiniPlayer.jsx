import React, { useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { togglePlayPause, updateProgress } from "../redux/slices/playbackSlice";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

export default function MiniPlayer() {
  const { currentSong, isPlaying } = useSelector((state) => state.playback);
  const dispatch = useDispatch();
  const router = useRouter();

  const soundRef = useRef(null);

  useEffect(() => {
    const setupSound = async () => {
      if (!currentSong?.previewUrl) return;

      try {
        // Unload previous sound if it exists
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }

        // Create a new sound instance
        const { sound } = await Audio.Sound.createAsync(
          { uri: currentSong.previewUrl },
          { shouldPlay: isPlaying }
        );

        soundRef.current = sound;

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            dispatch(updateProgress(status.positionMillis));
          }
        });

        if (isPlaying) {
          await soundRef.current.playAsync();
        } else {
          await soundRef.current.pauseAsync();
        }
      } catch (error) {
        console.error("Error setting up sound in MiniPlayer:", error);
      }
    };

    if (currentSong) {
      setupSound();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, [currentSong, isPlaying]);

  const handlePlayPause = async () => {
    if (!soundRef.current) return;

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
      dispatch(togglePlayPause());
    } catch (error) {
      console.error("Error toggling play/pause in MiniPlayer:", error);
    }
  };

  const navigateToSongPage = () => {
    router.push({
      pathname: "/music/[music]",
      params: {
        songImage: currentSong.songImage,
        songTitle: currentSong.songTitle,
        songArtist: currentSong.songArtist,
        externalUrl: currentSong.externalUrl,
        previewUrl: currentSong.previewUrl,
        duration: currentSong.duration,
      },
    });
  };

  if (!currentSong) return null;

  return (
    <TouchableOpacity
      onPress={navigateToSongPage}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#333",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: currentSong.songImage || "https://via.placeholder.com/50" }}
        style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{currentSong.songTitle}</Text>
        <Text style={{ color: "#aaa" }}>{currentSong.songArtist}</Text>
      </View>
      <TouchableOpacity onPress={handlePlayPause}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}