import React, { useState } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../../redux/slices/playlistTracksSlice";
import { addSongToPlaylist, deleteSongFromPlaylist  } from "../../api/playlistService";
import { useFavoritePlaylist } from "../../hooks/useFavoritePlaylist";
import { useSongPlayback } from "../../hooks/useSongPlayback";
import audioPlayerInstance from "../../utils/audioUtils";
import { getToken } from "../../utils/secureStore";
import { togglePlayPause } from "../../redux/slices/playbackSlice";

export default function SongPage() {
  const {
    songImage,
    songTitle,
    songArtist,
    externalUrl,
    previewUrl,
    duration,
    progress: initialProgress = 0,
  } = useLocalSearchParams();

  const dispatch = useDispatch();
  const router = useRouter();
  const { isPlaying } = useSelector((state) => state.playback);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const favoritePlaylistId = useFavoritePlaylist();
  const { progress, setProgress } = useSongPlayback({
    previewUrl,
    duration,
    initialProgress,
    externalUrl,
    songData: { songImage, songTitle, songArtist, externalUrl, previewUrl, duration },
  });

  const handlePlayPause = async () => {
    setLoading(true);
    try {
      if (isPlaying) {
        await audioPlayerInstance.pause();
      } else {
        await audioPlayerInstance.play();
      }
      dispatch(togglePlayPause());
    } catch (error) {
      console.error("Playback toggle error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) {
        Alert.alert("Error", "User is not logged in.");
        return;
      }
  
      if (isLiked) {
        await deleteSongFromPlaylist(jwtToken, favoritePlaylistId, songTitle);
  
        dispatch(removeTrackFromPlaylist({ playlistId: favoritePlaylistId, trackId: songTitle }));
  
        Alert.alert("Removed", "Song removed from 'My Favorite Songs'.");
      } else {
        if (!favoritePlaylistId) {
          Alert.alert("Error", "Default playlist not set.");
          return;
        }
  
        const metadata = {
          id: songTitle,
          image: songImage || "https://via.placeholder.com/300",
          title: songTitle || "Unknown Title",
          artist: songArtist || "Unknown Artist",
          externalUrl: externalUrl || null,
          previewUrl: previewUrl || null,
          duration: duration || 0,
        };
  
        const response = await addSongToPlaylist(jwtToken, favoritePlaylistId, "local", null, metadata);
  
        dispatch(
          addTrackToPlaylist({
            playlistId: favoritePlaylistId,
            track: {
              id: response.song.metadata.id || songTitle,
              name: response.song.metadata.title || "Unknown Title",
              artists: [response.song.metadata.artist || "Unknown Artist"],
              album: {
                images: response.song.metadata.image ? [{ url: response.song.metadata.image }] : [],
              },
              externalUrl: response.song.metadata.externalUrl || null,
              preview_url: response.song.metadata.previewUrl || null,
              duration_ms: parseInt(response.song.metadata.duration || 0, 10),
            },
          })
        );
  
        Alert.alert("Added", "Song added to 'My Favorite Songs'.");
      }
  
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating favorites:", error);
      Alert.alert("Error", "Failed to update 'My Favorite Songs'. Please try again.");
    }
  };
  
  
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", margin: 10 }}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-down" : "chevron-back"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <Text className="text-white text-lg font-Avenir-Demi">Now Playing</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: songImage || "https://via.placeholder.com/300" }}
          style={{ width: 400, height: 400, borderRadius: 2 }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-Avenir-Bold">{songTitle || "Unknown Title"}</Text>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={28}
              color={isLiked ? "#FF6100" : "#FFF"}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-lg font-avenir-regular">{songArtist || "Unknown Artist"}</Text>
      </View>

      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FF6100"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FF6100"
          value={progress}
          onSlidingComplete={(value) => {
            const position = value * duration;
            audioPlayerInstance.setPosition(position);
            setProgress(value);
          }}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">{formatDuration(progress * duration)}</Text>
          <Text className="text-white text-sm">{formatDuration(duration)}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-evenly mb-10">
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
