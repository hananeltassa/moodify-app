import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function RecommendedMusic({ data, title }) {
  const router = useRouter();

  return (
    <View className="p-2 bg-black">
      {/* Title */}
      {title && <Text className="text-white text-xl font-Avenir-Bold mb-2">{title}</Text>}

      {/* Horizontal List */}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="w-6" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/music/[music]",
                params: {
                  songTitle: item.title,
                  songImage: item.image.uri || "https://via.placeholder.com/300",
                  songArtist: item.artist,
                  externalUrl: item.externalUrl,
                  previewUrl: item.previewUrl,
                  album: item.album,
                  duration: item.duration,
                  playlistId: "recommended",
                },
              })
            }
            className="w-40"
          >
            {/* Playlist Image */}
            <Image source={{ uri: item.image.uri || "https://via.placeholder.com/300" }} className="w-44 h-44" />

            {/* Playlist Title */}
            <Text
              className="text-white text-sm font-bold mt-2 truncate"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: 150 }}
            >
              {item.title || "Unknown Title"}
            </Text>

            {/* Playlist Subtitle */}
            <Text
              className="text-gray-400 text-xs truncate"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: 150 }}
            >
              {item.artist || "Unknown Artist"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
