import React, { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Playlist from "../../components/Playlist";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/secureStore";
import { fetchSpotifyPlaylists } from "../../api/spotifyAuth";

export default function Library() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const user = useSelector((state) => state.user.user);

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
  
        const jwtToken = await getToken("jwtToken");
        if (!jwtToken) {
          throw new Error("User is not logged in.");
        }
  
        if (user?.spotifyId) {
          console.log("Fetching Spotify playlists...");
          const playlistsData = await fetchSpotifyPlaylists(jwtToken);
  
          setPlaylists(playlistsData);
        } else {
          // Mock data for non-Spotify users
          setPlaylists([
            {
              id: "1",
              name: "Liked Songs",
              description: "Your favorite songs",
              images: [{ url: "https://via.placeholder.com/150" }],
              totalTracks: 50,
            },
            {
              id: "2",
              name: "Relaxation Mix",
              description: "Relaxing tunes for the soul",
              images: [{ url: "https://via.placeholder.com/150" }],
              totalTracks: 30,
            },
            {
              id: "3",
              name: "Workout Hits",
              description: "Pump up your workout",
              images: [{ url: "https://via.placeholder.com/150" }],
              totalTracks: 40,
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError(err.message || "Failed to load playlists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlaylists();
  }, [user]);
  

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center bg-black">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text className="text-white mt-4">Loading your playlists...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 justify-center items-center bg-black">
          <Text className="text-white text-lg">{error}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

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
        <View className="flex-1">
          {/* Title */}
          <Text className="font-Avenir-Bold text-white text-3xl mb-2">Your Library</Text>

          {/* Playlist List */}
          <FlatList
            data={playlists}
            className="pt-4"
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Playlist
                title={item.name}
                subtitle={`${item.totalTracks} tracks`}
                image={
                  item.images?.length > 0
                    ? { uri: item.images[0].url }
                    : null
                }
                onPress={() =>
                  router.push({
                    pathname: "/playlist/[playlist]",
                    params: { playlist: item.id, playlistName: item.name },
                  })
                }
              />
            )}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
