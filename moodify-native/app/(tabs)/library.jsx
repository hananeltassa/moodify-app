import React from "react";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import LibraryItem from "../../components/LibraryItem";
import images from "../../constants/images";

export default function Library() {
  const playlists = [
    {
      id: "1",
      title: "Liked Songs",
      subtitle: "Playlist • 58 songs",
      image: images.playlist2,
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
    <SafeAreaView className="flex-1 bg-black px-4">
      <View className="px-4" style={{ marginTop: 20, marginBottom: 16}}>
        <Text className="text-white font-Avenir-Bold text-3xl mb-2 mt-5">
          Search
        </Text>
      <FlatList
        className="py-2"
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LibraryItem
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={() => console.log(`Clicked on ${item.title}`)}
          />
        )}
      />
      </View>
    </SafeAreaView>
  );
}
