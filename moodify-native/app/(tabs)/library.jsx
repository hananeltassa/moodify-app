import React from "react";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import Playlist from "../../components/Playlist";
import images from "../../constants/images";
import { useRouter } from "expo-router";

export default function Library() {
  const router = useRouter();
  
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
    <SafeAreaView className="flex-1 bg-black px-2">
      <View className="px-4" style={{ marginTop: 20, marginBottom: 16}}>
        <Text className="text-white font-Avenir-Bold text-3xl mb-2 mt-5">
          Your Library
        </Text>
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
                params: { playlist: "some-playlist", playlistName: "Playlist Name" },
              })
            }
          />
        )}
      />
      </View>
    </SafeAreaView>
  );
}
