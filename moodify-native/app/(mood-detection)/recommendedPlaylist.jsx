import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { searchJamendoMusic } from "@/api/jamendo";
import { MusicItem } from "@/components/PlaylistComponents";
import { useSelector } from "react-redux";

export default function Playlist() {
  const { mood, AIdescription } = useSelector((state) => state.mood);
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
    const moodQuery = AIdescription?.trim() || moodToMusicQuery[mood] || "calm";

    console.log("AIdescription:", AIdescription);
    console.log("Mood:", mood);
    console.log("Query for Jamendo API:", moodQuery);

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
