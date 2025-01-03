import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import TextField from "../../components/TextField";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/secureStore";
import { searchSpotifyTracks } from "../../api/spotifyAuth";
import Music from "../../components/Music";
import Playlist from "../../components/Playlist";
import { useRouter } from "expo-router";

export default function Search() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("track");

  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = async (text) => {
    setSearchValue(text);

    if (text.trim() === "") {
      setResults([]);
      return;
    }

    if (user?.spotifyId) {
      try {
        setLoading(true);
        const jwtToken = await getToken("jwtToken");

        if (!jwtToken) {
          throw new Error("User is not logged in.");
        }

        const spotifyResults = await searchSpotifyTracks(text, jwtToken, searchType);
        const uniqueResults = Array.from(
          new Map(
            spotifyResults.map((item, index) => [
              `${item.name}-${item.artists?.join(", ")}-${index}`,
              {
                id: `${item.name}-${item.artists?.join(", ")}-${index}`,
                name: item.name,
                artists: item.artists?.join(", ") || item.owner || "",
                album: item.album,
                image: item.album?.images?.[0]?.url || item.images?.[0]?.url || "https://via.placeholder.com/100",
                previewUrl: item.preview_url,
                externalUrl: item.externalUrl,
                duration_ms: item.duration_ms,
              },
            ])
          ).values()
        );
        setResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching Spotify search results:", error);
        Alert.alert("Error", error.message || "Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback to mock search if the user is not a Spotify user
      searchDatabase(text);
    }
  };

  const renderResultItem = ({ item }) => {
    if (searchType === "track") {
      return (
        <Music
          title={item.name}
          subtitle={item.artists}
          image={
            item.album?.images?.length > 0
              ? { uri: item.album.images[0].url }
              : { uri: "https://via.placeholder.com/300" }
          }
          onPress={() =>
            router.push({
              pathname: "/music/[music]",
              params: {
                songTitle: item.name,
                songImage: item.album?.images?.length > 0 ? item.album.images[0].url : null,
                songArtist: item.artists,
                songUri: item.album.uri,
                externalUrl: item.externalUrl,
                previewUrl: item.preview_url,
                duration: item.duration_ms,
              },
            })
          }
        />
      );
    }

    if (searchType === "playlist") {
      return (
        <Playlist
          title={item.name}
          subtitle={item.artists || "Various Artists"}
          image={
            item.image
              ? { uri: item.image }
              : { uri: "https://via.placeholder.com/300" }
          }
          onPress={() => console.log(`Selected playlist: ${item.name}`)}
        />
      );
    }

    return null;
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchValue("");
    setResults([]);
  };

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
        <View>
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">Search</Text>

          <TextField
            title="Search"
            value={searchValue}
            placeholder={`Search ${searchType}...`}
            handleChangeText={handleSearchChange}
            inputSize={16}
            iconName="search"
            iconColor="#7B7B8B"
          />

          {/* Filter Buttons */}
          <View className="flex-row gap-4 mt-4">
            <TouchableOpacity
              className={`px-4 py-2 rounded-full border ${
                searchType === "track" ? "bg-white" : "bg-transparent"
              }`}
              style={{
                borderWidth: 1,
                borderColor: "white",
              }}
              onPress={() => handleSearchTypeChange("track")}
            >
              <Text
                className={`font-Avenir-Demi ${
                  searchType === "track" ? "text-black" : "text-white"
                }`}
              >
                Tracks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 rounded-full border ${
                searchType === "playlist" ? "bg-white" : "bg-transparent"
              }`}
              style={{
                borderWidth: 1,
                borderColor: "white",
              }}
              onPress={() => handleSearchTypeChange("playlist")}
            >
              <Text
                className={`font-Avenir-Demi ${
                  searchType === "playlist" ? "text-black" : "text-white"
                }`}
              >
                Playlists
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
            Searching...
          </Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderResultItem}
            ListEmptyComponent={
              searchValue ? (
                <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>
                  No results found.
                </Text>
              ) : null
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
