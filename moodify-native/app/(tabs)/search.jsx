import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
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
        const uniqueResults = spotifyResults.map((item) => ({
          id: item.id,
          name: item.name,
          artists: item.artists?.join(", ") || item.owner || "",
          album: item.album,
          image:
            item.album?.images?.[0]?.url ||
            item.images?.[0]?.url ||
            "https://via.placeholder.com/100",
          previewUrl: item.preview_url,
          externalUrl: item.externalUrl,
          duration_ms: item.duration_ms,
          totalTracks: item.totalTracks,
        }));

        setResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching Spotify search results:", error);
        Alert.alert("Error", error.message || "Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderResultItem = ({ item }) => {
    if (searchType === "track") {
      return (
        <Music
          title={item.name}
          subtitle={item.artists}
          image={item.image ? { uri: item.image } : { uri: "https://via.placeholder.com/300" }}
          onPress={() =>
            router.push({
              pathname: "/music/[music]",
              params: {
                songTitle: item.name,
                songImage: item.image,
                songArtist: item.artists,
                externalUrl: item.externalUrl,
                previewUrl: item.previewUrl,
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
          subtitle={item.owner}
          image={item.image ? { uri: item.image } : { uri: "https://via.placeholder.com/300" }}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/playlist/[playlist]",
              params: {
                playlist: item.id,
                playlistName: item.name,
                playlistImage: item.image,
                from: "search",
              },
            })
          }
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
          <Text style={{ fontFamily: "Avenir-Bold", color: "white", fontSize: 24, marginBottom: 10 }}>
            Search
          </Text>

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
          <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: searchType === "track" ? "white" : "transparent",
              }}
              onPress={() => handleSearchTypeChange("track")}
            >
              <Text
                style={{
                  fontFamily: "Avenir-Demi",
                  color: searchType === "track" ? "black" : "white",
                }}
              >
                Tracks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: "white",
                backgroundColor: searchType === "playlist" ? "white" : "transparent",
              }}
              onPress={() => handleSearchTypeChange("playlist")} // Correct type here
            >
              <Text
                style={{
                  fontFamily: "Avenir-Demi",
                  color: searchType === "playlist" ? "black" : "white",
                }}
              >
                Playlists
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <Text style={{ color: "gray", textAlign: "center", marginTop: 20 }}>Searching...</Text>
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
