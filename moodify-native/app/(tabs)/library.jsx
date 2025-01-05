import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Playlist from "../../components/Playlist";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../utils/secureStore";
import { fetchSpotifyPlaylists } from "../../api/spotifyAuth";
import { setPlaylists } from "../../redux/slices/playlistSlice";
import LoadingScreen from "../../components/LoadingScreen";
import images from "@/constants/images"

import { createPlaylist, getUserPlaylists } from "../../api/playlistService";

export default function Library() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const playlists = useSelector((state) => state.playlists.items);
  const isFetched = useSelector((state) => state.playlists.isFetched);
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ensureDefaultPlaylistExists = async (jwtToken) => {
    try {
      const { playlists: fetchedPlaylists } = await getUserPlaylists(jwtToken);

      const likedSongsPlaylist = fetchedPlaylists.find((playlist) => playlist.is_default);
      if (!likedSongsPlaylist) {
        console.log("Creating default 'Liked Songs' playlist...");
        await createPlaylist(jwtToken, "My Favorite Songs", true);

        // Fetch playlists again after creation
        const updatedPlaylists = await getUserPlaylists(jwtToken);
        dispatch(setPlaylists(updatedPlaylists.playlists));
      } else {
        dispatch(setPlaylists(fetchedPlaylists));
      }
    } catch (error) {
      console.error("Error ensuring default playlist exists:", error);
      throw error;
    }
  };

  const fetchPlaylists = async () => {
    try {
      setLoading(true);

      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) {
        throw new Error("User is not logged in.");
      }

      // Ensure default playlist exists
      await ensureDefaultPlaylistExists(jwtToken);

      if (user?.spotifyId) {
        console.log("Fetching Spotify playlists...");
        const spotifyPlaylists = await fetchSpotifyPlaylists(jwtToken);

        // Combine Spotify playlists with backend playlists (avoiding duplicates)
        const backendPlaylists = await getUserPlaylists(jwtToken);
        const combinedPlaylists = [
          ...backendPlaylists.playlists,
          ...spotifyPlaylists.filter(
            (spotifyPlaylist) =>
              !backendPlaylists.playlists.some(
                (backendPlaylist) => backendPlaylist.id === spotifyPlaylist.id
              )
          ),
        ];

        dispatch(setPlaylists(combinedPlaylists));
      }
    } catch (err) {
      console.error("Error fetching playlists:", err);
      setError(err.message || "Failed to load playlists. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched) {
      fetchPlaylists();
    }
  }, [user]);

  if (loading) {
    return <LoadingScreen message="Loading your playlists..." />;
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
                subtitle={`${item.totalTracks || 0} tracks`}
                image={
                  item.images?.length > 0
                    ? { uri: item.images[0].url }
                    : images.playlist
                }
                onPress={() =>
                  router.push({
                    pathname: "/playlist/[playlist]",
                    params: {
                      playlist: item.id,
                      playlistName: item.name,
                      playlistImage: item.images?.length > 0 ? item.images[0].url : null,
                      from: "library",
                    },
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
