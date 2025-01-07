import React, { useState, useEffect } from "react";
import { View, Image, Text, SafeAreaView, TouchableOpacity, Platform, Alert, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToPlaylist, removeTrackFromPlaylist, selectTracksByPlaylistId,} from "../../redux/slices/playlistTracksSlice";
import { addSongToPlaylist, deleteSongFromPlaylist } from "../../api/playlistService";
import { useFavoritePlaylist } from "../../hooks/useFavoritePlaylist";
import { useSongPlayback } from "../../hooks/useSongPlayback";
import audioPlayerInstance from "../../utils/audioUtils";
import { togglePlayPause, playSong } from "../../redux/slices/playbackSlice";
import { formatDuration } from "../../utils/timeUtils";
import { useTrackNavigation } from "../../hooks/useTrackNavigation";


export default function SongPage() {
  const {
    songImage,
    songTitle,
    songArtist,
    externalUrl,
    previewUrl,
    duration,
    progress: initialProgress = 0,
    playlistId, // Dynamic playlist id
  } = useLocalSearchParams();

  const dispatch = useDispatch();
  const router = useRouter();
  const { isPlaying, currentSong } = useSelector((state) => state.playback);
  const playlistTracks = useSelector((state) =>
    selectTracksByPlaylistId(state, playlistId)
  );

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { progress, setProgress } = useSongPlayback({
    previewUrl,
    duration,
    initialProgress,
    externalUrl,
    songData: { songImage, songTitle, songArtist, externalUrl, previewUrl, duration },
  });

  const updateIsLiked = (title) => {
    if (playlistTracks) {
      const isFavorite = playlistTracks.some(
        (track) => track.name === title && track.liked
      );
      setIsLiked(isFavorite);
    }
  };

  const { skipForward, skipBackward } = useTrackNavigation({
    playlistTracks,
    currentSongTitle: songTitle,
    dispatch,
    router,
    playSong,
    updateIsLiked,
    playlistId,
  });
  
  useEffect(() => {
    console.log("Current playlistId:", playlistId);
    console.log("Current track list:", playlistTracks);
    console.log("Current track title:", songTitle);
    updateIsLiked(songTitle);
  }, [playlistTracks, songTitle]);

  const currentIndex = playlistTracks.findIndex(
    (track) => track.name === songTitle
  );

  const handlePlayPause = async () => {
    setLoading(true);
    try {
      if (isPlaying) {
        await audioPlayerInstance.pause();
      } else {
        await audioPlayerInstance.play();
      }
      dispatch(togglePlayPause());
    } catch (error) {
      console.error("Playback toggle error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleToggleFavorite = async () => {
    try {
      const jwtToken = await getToken("jwtToken");
      if (!jwtToken) {
        Alert.alert("Error", "User is not logged in.");
        return;
      }

      if (isLiked) {
        const trackToRemove = playlistTracks.find(
          (track) => track.name === songTitle
        );

        if (!trackToRemove) {
          Alert.alert("Error", "Track not found in the playlist.");
          return;
        }

        await deleteSongFromPlaylist(jwtToken, playlistId, songTitle);

        dispatch(
          removeTrackFromPlaylist({
            playlistId,
            trackId: trackToRemove.id,
          })
        );

        Alert.alert("Removed", "Song removed from the playlist.");
      } else {
        const metadata = {
          id: songTitle,
          image: songImage || "https://via.placeholder.com/300",
          title: songTitle || "Unknown Title",
          artist: songArtist || "Unknown Artist",
          externalUrl: externalUrl || null,
          previewUrl: previewUrl || null,
          duration: duration || 0,
          liked: true,
        };

        const response = await addSongToPlaylist(
          jwtToken,
          playlistId,
          "local",
          null,
          metadata
        );

        dispatch(
          addTrackToPlaylist({
            playlistId,
            track: {
              id: response.song.metadata.id || songTitle,
              name: response.song.metadata.title || "Unknown Title",
              artists: [response.song.metadata.artist || "Unknown Artist"],
              album: {
                images: response.song.metadata.image
                  ? [{ url: response.song.metadata.image }]
                  : [],
              },
              externalUrl: response.song.metadata.externalUrl || null,
              preview_url: response.song.metadata.previewUrl || null,
              duration_ms: parseInt(response.song.metadata.duration || 0, 10),
              liked: true,
            },
          })
        );

        Alert.alert("Added", "Song added to the playlist.");
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating favorites:", error);
      Alert.alert("Error", "Failed to update the playlist. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", margin: 10 }}>
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-down" : "chevron-back"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <Text className="text-white text-lg font-Avenir-Demi">Now Playing</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: songImage || "https://via.placeholder.com/300" }}
          style={{ width: 400, height: 400, borderRadius: 2 }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-Avenir-Bold">
            {songTitle || "Unknown Title"}
          </Text>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={28}
              color={isLiked ? "#FF6100" : "#FFF"}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-lg font-avenir-regular">
          {songArtist || "Unknown Artist"}
        </Text>
      </View>

      <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FF6100"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#FF6100"
          value={progress}
          onSlidingComplete={(value) => {
            const position = value * duration;
            audioPlayerInstance.setPosition(position);
            setProgress(value);
          }}
        />
        <View className="flex-row justify-between px-2">
          <Text className="text-white text-sm">
            {formatDuration(progress * duration)}
          </Text>
          <Text className="text-white text-sm">{formatDuration(duration)}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-evenly mb-10">
        <TouchableOpacity onPress={skipBackward}>
          <Ionicons name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Ionicons name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
