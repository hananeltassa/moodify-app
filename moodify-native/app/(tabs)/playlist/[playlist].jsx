import React, { useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import LoadingScreen from "../../../components/LoadingScreen";
import { usePlaylistTracks } from "../../../hooks/usePlaylistTracks";
import { PlaylistHeader, MusicItem } from "../../../components/PlaylistComponents";

export default function Playlist() {
  const { from, playlist: playlistId, playlistName, playlistImage } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);

  const { tracks, loading } = usePlaylistTracks(playlistId, playlistName, user);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => setIsLiked(!isLiked);

  if (loading) return <LoadingScreen message="Loading tracks..." />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top, backgroundColor: "black" }}>
        {/* Back Button */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => (from === "library" ? router.replace("/library") : router.back())}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={["header", ...tracks]}
          keyExtractor={(item, index) => (item === "header" ? "header" : `${item.id || index}`)}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            item === "header" ? (
              <PlaylistHeader
                playlistName={playlistName}
                playlistImage={playlistImage}
                isLiked={isLiked}
                toggleLike={toggleLike}
              />
            ) : (
              <MusicItem track={item} />
            )
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
