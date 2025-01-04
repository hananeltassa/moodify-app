import { useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { getToken } from "../utils/secureStore";
import { searchSpotifyTracks } from "../api/spotifyAuth";

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("track");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  const fetchSpotifyResults = async (query) => {
    try {
      setLoading(true);
      const jwtToken = await getToken("jwtToken");

      if (!jwtToken) {
        throw new Error("User is not logged in.");
      }

      const spotifyResults = await searchSpotifyTracks(query, jwtToken, searchType);
      return spotifyResults.map((item, index) => ({
        id: item.id || `${item.name}-${index}`,
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
    } catch (error) {
      console.error("Error fetching Spotify search results:", error);
      Alert.alert("Error", error.message || "Failed to fetch search results.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchJamendoResults = async (query) => {
    console.log(`Jamendo search for query: ${query}, type: ${searchType}`);
    // Placeholder for Jamendo API logic
    return [];
  };

  const handleSearchChange = async (text) => {
    setSearchValue(text);

    if (text.trim() === "") {
      setResults([]);
      return;
    }

    if (user?.spotifyId) {
      const spotifyResults = await fetchSpotifyResults(text);
      setResults(spotifyResults);
    } else {
      const jamendoResults = await fetchJamendoResults(text);
      setResults(jamendoResults);
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchValue("");
    setResults([]);
  };

  return {
    searchValue,
    results,
    searchType,
    loading,
    handleSearchChange,
    handleSearchTypeChange,
    isSpotifyUser: !!user?.spotifyId,
  };
};
