import React, { useEffect, useState } from "react";
import { View, Image, Text, SafeAreaView, FlatList, Alert, TouchableOpacity } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import images from "@/constants/images";
import Music from "../../../components/Music";
import { fetchSpotifyPlaylistTracks } from "../../../api/spotifyAuth";
import { getToken } from "../../../utils/secureStore";
import LoadingScreen from "../../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylistTracks } from "../../../redux/slices/playlistTracksSlice";

export default function Playlist() {
  const { playlist, playlistName, playlistImage } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const cachedTracks = useSelector((state) => state.playlistTracks.tracks[playlist]);
  const isFetched = useSelector((state) => state.playlistTracks.isFetched[playlist]);

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadPlaylistTracks = async () => {
      if (isFetched) {
        setTracks(cachedTracks);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const jwtToken = await getToken("jwtToken");
        if (!jwtToken) {
          throw new Error("User is not logged in.");
        }

        const playlistTracks = await fetchSpotifyPlaylistTracks(playlist, jwtToken);
        setTracks(playlistTracks);

        dispatch(setPlaylistTracks({ playlistId: playlist, tracks: playlistTracks }));
      } catch (error) {
        console.error("Error loading playlist tracks:", error);
        Alert.alert("Error", error.message || "Failed to load playlist tracks.");
      } finally {
        setLoading(false);
      }
    };

    if (playlist) {
      loadPlaylistTracks();
    }
  }, [playlist, isFetched, cachedTracks]);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  if (loading) {
    return <LoadingScreen message="Loading tracks..." />;
  }

  if (!tracks.length) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: 16,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white text-lg">No tracks found for this playlist.</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: "black",
        }}
      >
        <FlatList
          data={["header", ...tracks]}
          keyExtractor={(item, index) => (item === "header" ? "header" : index.toString())}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          renderItem={({ item }) =>
            item === "header" ? (
              <View>
                {/* Back Button */}
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Playlist Image */}
                <View className="items-center mb-6">
                  <Image
                    source={
                      playlistImage
                        ? { uri: playlistImage }
                        : images.playlist
                    }
                    className="w-96 h-96"
                    resizeMode="contain"
                  />
                </View>

                {/* Playlist Title and Like Icon */}
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
                subtitle={item.artists.join(", ")}
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
                      songArtist: item.artists.join(", "),
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
