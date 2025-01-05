import React, { useEffect, useState } from "react";
import { View, Image, Text, SafeAreaView, FlatList, Alert, TouchableOpacity } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import Music from "../../../components/Music";
import { fetchSpotifyPlaylistTracks } from "../../../api/spotifyAuth";
import { getPlaylistSongs } from "../../../api/playlistService";
import { getToken } from "../../../utils/secureStore";
import LoadingScreen from "../../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistTracks } from "../../../redux/slices/playlistTracksSlice";

export default function Playlist() {
  const { from, playlist, playlistName, playlistImage } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const cachedTracks = useSelector((state) => state.playlistTracks.tracks[playlist]);
  const isFetched = useSelector((state) => state.playlistTracks.isFetched[playlist]);
  const user = useSelector((state) => state.user.user);

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const loadPlaylistTracks = async () => {
    if (isFetched) {
      setTracks(cachedTracks || []);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) {
        throw new Error("User is not logged in.");
      }

      if (user?.spotifyId && playlistName !== "My Favorite Songs") {
        // Fetch Spotify playlist tracks
        const playlistTracks = await fetchSpotifyPlaylistTracks(playlist, jwtToken);
        setTracks(playlistTracks || []);
        dispatch(setPlaylistTracks({ playlistId: playlist, tracks: playlistTracks || [] }));
      } else {
        // Fetch local playlist tracks
        const localTracks = await getPlaylistSongs(jwtToken, playlist);
        setTracks(localTracks?.songs || []);
        dispatch(setPlaylistTracks({ playlistId: playlist, tracks: localTracks?.songs || [] }));
      }
    } catch (error) {
      console.error("Error loading playlist tracks:", error.message || error);
      Alert.alert("Error", "Failed to load playlist tracks. Please try again.");
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlist) {
      loadPlaylistTracks();
    }
  }, [playlist, isFetched, cachedTracks, user, playlistName]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return <LoadingScreen message="Loading tracks..." />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top, backgroundColor: "black" }}>
        {/* Back Button */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => (from === "library" ? router.replace("/library") : router.back())}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={["header", ...tracks]}
          keyExtractor={(item, index) => (item === "header" ? "header" : `${item.id || index}`)}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          renderItem={({ item }) =>
            item === "header" ? (
              <View>
                <View className="items-center mb-6">
                  <Image
                    source={playlistImage ? { uri: playlistImage } : images.playlist}
                    className="w-96 h-96"
                    resizeMode="contain"
                  />
                </View>
                <View className="flex-row items-center justify-between p-4 mb-2">
                  <Text className="text-white text-2xl font-Avenir-Bold">{playlistName || "Playlist"}</Text>
                  <TouchableOpacity onPress={toggleLike}>
                    <Ionicons
                      name={isLiked ? "heart" : "heart-outline"}
                      size={28}
                      color={isLiked ? "#FF6100" : "#FFF"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Music
                title={item.name}
                subtitle={item.artists?.join(", ") || "Unknown Artist"}
                image={
                  item.album?.images?.length > 0
                    ? { uri: item.album.images[0].url }
                    : images.playlist
                }
                onPress={() =>
                  router.push({
                    pathname: "/music/[music]",
                    params: {
                      songTitle: item.name,
                      songImage: item.album?.images?.length > 0 ? item.album.images[0].url : null,
                      songArtist: item.artists?.join(", ") || "Unknown Artist",
                      songUri: item.album.uri,
                      externalUrl: item.externalUrl,
                      previewUrl: item.preview_url,
                      duration: item.duration_ms,
                    },
                  })
                }
                onMorePress={() => console.log("More options pressed")}
              />
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
