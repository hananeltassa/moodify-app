import React from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Playlist from "../../components/Playlist";
import images from "../../constants/images";
import { useRouter } from "expo-router";

export default function Library() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const playlists = [
    {
      id: "1",
      title: "Liked Songs",
      subtitle: "Playlist • 58 songs",
      image: images.playlist,
    },
    {
      id: "2",
      title: "Workout Hits",
      subtitle: "Playlist • 35 songs",
      image: images.playlist,
    },
    {
      id: "3",
      title: "Chill Vibes",
      subtitle: "Playlist • 42 songs",
      image: images.playlist,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: insets.bottom,
          backgroundColor: "black",
          paddingHorizontal: 16
        }}
      > 
        <View>
          {/* Title */}
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">
            Your Library
          </Text>

          {/* Playlist List */}
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Playlist
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                onPress={() =>
                  router.push({
                    pathname: "/playlist/[playlist]",
                    params: { playlist: "some-playlist", playlistName: item.title },
                  })
                }
              />
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
