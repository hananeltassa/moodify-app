import React from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Playlist from "../../components/Playlist";
import { useRouter } from "expo-router";
import LoadingScreen from "../../components/LoadingScreen";
import images from "@/constants/images";
import { useSelector } from "react-redux";
import { usePlaylists } from "../../hooks/usePlaylists";

export default function Library() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useSelector((state) => state.user.user);

  const { playlists, loading, error } = usePlaylists(user);

  if (loading) {
    return <LoadingScreen message="Loading your playlists..." />;
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center bg-black">
          <Text className="text-white text-lg">{error}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: insets.bottom,
          backgroundColor: "black",
          paddingHorizontal: 16,
        }}
      >
        <View className="flex-1">
          {/* Title */}
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">Your Library</Text>

          {/* Playlist List */}
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Playlist
                title={item.name}
                subtitle={
                  item.name === "My Favorite Songs" ? null : `${item.totalTracks || 0} tracks`
                }
                image={
                  item.images?.length > 0
                    ? { uri: item.images[0].url }
                    : images.playlist
                }
                onPress={() =>
                  router.push({
                    pathname: "/playlist/[playlist]",
                    params: {
                      playlist: item.id,
                      playlistName: item.name,
                      playlistImage: item.images?.length > 0 ? item.images[0].url : null,
                      from: "library",
                    },
                  })
                }
              />
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
