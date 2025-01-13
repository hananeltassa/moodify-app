import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { searchJamendoMusic } from "@/api/jamendo";
import { PlaylistHeader, MusicItem } from "@/components/PlaylistComponents";
import { useSelector } from 'react-redux';

export default function Playlist() {
  const mood = useSelector((state) => state.mood.mood);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
  }, []);

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
    try {
      const moodQuery = moodToMusicQuery[mood] || 'calm';
      const results = await searchJamendoMusic(moodQuery);
      setTracks(results);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

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
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={renderTrackItem}
        />
      )}
    </View>
  );
}
