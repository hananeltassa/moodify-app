import { Text, View, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import TextField from "../../components/TextField";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/secureStore";
import { searchSpotifyTracks } from "../../api/spotifyAuth";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("track");

  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = async (text) => {
    setSearchValue(text);

    if (text.trim() === "") {
      setResults([]); // Clear results if the query is empty
      return;
    }

    if (user?.spotifyId) {
      try {
        setLoading(true);
        const jwtToken = await getToken("jwtToken");

        if (!jwtToken) {
          throw new Error("User is not logged in.");
        }

        const spotifyResults = await searchSpotifyTracks(text, jwtToken, searchType); // Pass search type
        setResults(
          spotifyResults.map((item) => ({
            id: item.name + (item.artists?.join(", ") || item.owner || ""),
            title: item.name,
            subtitle: item.artists?.join(", ") || item.owner || "",
            image: item.album?.images?.[0]?.url || item.images?.[0]?.url || "https://via.placeholder.com/100",
            previewUrl: item.preview_url,
            externalUrl: item.externalUrl,
          }))
        );
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

  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-4"
      onPress={() => console.log(`Selected: ${item.title}`)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-white text-base font-bold">{item.title}</Text>
        <Text className="text-gray-400 text-sm">{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchValue(""); // Clear the search value when changing type
    setResults([]); // Clear results when changing type
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
                  searchType === "playlist" ? "text-white" : "text-primary"
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
                  searchType === "playlist" ? "text-primary" : "text-white"
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
