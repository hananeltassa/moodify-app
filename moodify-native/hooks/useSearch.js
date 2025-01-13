import { useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { getToken } from "../utils/secureStore";
import { searchSpotifyTracks } from "../api/spotifyAuth";
import { searchJamendoMusic } from "../api/jamendo";

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("track");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
  const isSpotifyUser = !!user?.spotifyId;

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
      Alert.alert("Error", error.message || "Failed to fetch Spotify results.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchJamendoResults = async (query) => {
    try {
      setLoading(true);

      const jamendoResults = await searchJamendoMusic(query, "tracks");

      return jamendoResults.map((item) => ({
        id: item.id,
        name: item.name,
        artists: item.artist,
        album: item.album,
        image: item.image || "https://via.placeholder.com/100",
        duration_ms: item.duration * 1000,
        audioUrl: item.audio,
      }));
    } catch (error) {
      console.error("Error fetching Jamendo search results:", error);
      Alert.alert("Error", error.message || "Failed to fetch Jamendo results.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (text) => {
    setSearchValue(text);

    if (text.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const fetchedResults = isSpotifyUser ? await fetchSpotifyResults(text): await fetchJamendoResults(text);

      setResults(fetchedResults);
    } catch (error) {
      console.error("Error during search:", error);
      setResults([]);
    }
  };

  const handleSearchTypeChange = (type) => {
    if (!isSpotifyUser && type === "playlist") {
      Alert.alert("Notice", "Playlists are only available for Spotify users.");
      return;
    }

    setSearchType(type);
    setSearchValue("");
    setResults([]);
  };

  return {
    searchValue,
    results,
    searchType, // Tracks by default
    loading,
    handleSearchChange,
    handleSearchTypeChange,
    isSpotifyUser,
  };
};
