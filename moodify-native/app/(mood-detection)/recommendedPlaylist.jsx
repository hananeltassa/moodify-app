import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { searchJamendoMusic } from "@/api/jamendo";
import { MusicItem } from "@/components/PlaylistComponents";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectMoodState = createSelector(
  (state) => state.mood,
  (mood) => ({
    AIdescription: mood?.AIdescription || "No description available",
  })
);

export default function Playlist() {
  const { AIdescription } = useSelector(selectMoodState);
  const { mood } = useSelector((state) => state.mood.mood);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const moodToMusicQuery = {
    happy: "feel-good anthems",
    sad: "comforting acoustic ballads",
    disgust: "calming ambient sounds",
    neutral: "chill background music",
    angry: "relaxing lo-fi beats",
    fear: "peaceful piano instrumentals",
    surprise: "energetic pop hits",
    love: "romantic love songs",
  };

  const fetchTracks = async () => {
    // Determine the query to use
    const moodQuery =
      AIdescription?.trim() !== "No description available." && AIdescription?.trim()
        ? AIdescription.trim()
        : moodToMusicQuery[mood] || null;

    // console.log("moodToMusicQuery:", moodToMusicQuery[mood]);
    // console.log("Mood:", mood);
    console.log("AIdescription:", AIdescription);
    // console.log("Query for Jamendo API:", moodQuery);

    if (!moodQuery) {
      console.warn("No valid mood query available");
      setTracks([]);
      setLoading(false);
      return;
    }

    try {
      const results = await searchJamendoMusic(moodQuery);
      setTracks(results);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (AIdescription || mood) {
      setLoading(true);
      fetchTracks();
    }
  }, [AIdescription, mood]);

  const renderTrackItem = ({ item }) => (
    <MusicItem
      track={{
        name: item.name,
        artists: [item.artist],
        album: { images: [{ url: item.image }] },
        externalUrl: item.audio,
        preview_url: item.audio,
        duration_ms: item.duration * 1000,
      }}
      playlistId="mood-detection"
    />
  );

  return (
    <View className="flex-1 bg-black">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      ) : tracks.length > 0 ? (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={renderTrackItem}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-300 text-lg">
            No tracks found. Try again later!
          </Text>
        </View>
      )}
    </View>
  );
}
