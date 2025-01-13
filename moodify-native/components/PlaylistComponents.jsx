import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import Music from "./Music";
import { useState, useEffect } from "react";

export const PlaylistHeader = ({ playlistName, playlistImage, isLiked, toggleLike }) => (
  <View>
    <View className="items-center mb-6">
      <Image
        source={playlistImage ? { uri: playlistImage } : images.playlist}
        className="w-96 h-96"
        resizeMode="contain"
      />
    </View>
    <View className="flex-row items-center justify-between p-4 mb-2">
      <Text className="text-white text-2xl font-Avenir-Bold">{playlistName || "Playlist"}</Text>
      {/* <TouchableOpacity onPress={toggleLike}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={28}
          color={isLiked ? "#FF6100" : "#FFF"}
        />
      </TouchableOpacity> */}
    </View>
  </View>
);

export const MusicItem = ({ track, playlistId }) => {
  const router = useRouter();
  useEffect(() => {
      //console.log("playlistId in component:", playlistId);
    }, []);
  return (
    <Music
      title={track.name}
      subtitle={track.artists?.join(", ") || "Unknown Artist"}
      image={
        track.album?.images?.length > 0
          ? { uri: track.album.images[0].url }
          : images.playlist
      }
      onPress={() =>
        router.push({
          pathname: "/music/[music]",
          params: {
            songTitle: track.name,
            songImage: track.album?.images?.length > 0 ? track.album.images[0].url : null,
            songArtist: track.artists?.join(", ") || "Unknown Artist",
            songUri: track.album.uri,
            externalUrl: track.externalUrl,
            previewUrl: track.preview_url,
            duration: track.duration_ms,
            playlistId,
          },
        })
      }
      onMorePress={() => console.log("More options pressed")}
    />
  );
};
