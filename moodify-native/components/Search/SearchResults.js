import React from "react";
import { FlatList, Text } from "react-native";
import Music from "../Music";
import Playlist from "../Playlist";

export default function SearchResults({ results, searchType, onItemPress }) {
  const renderItem = ({ item }) => {
    if (searchType === "track") {
      return (
        <Music
          title={item.name}
          subtitle={item.artists}
          image={item.image ? { uri: item.image } : { uri: "https://via.placeholder.com/300" }}
          onPress={() => onItemPress("track", item)}
        />
      );
    }

    if (searchType === "playlist") {
      return (
        <Playlist
          title={item.name}
          subtitle={item.owner}
          image={item.image ? { uri: item.image } : { uri: "https://via.placeholder.com/300" }}
          onPress={() => onItemPress("playlist", item)}
        />
      );
    }

    return null;
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={
        <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
          No results found.
        </Text>
      }
    />
  );
}
