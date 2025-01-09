import { useState, useEffect } from "react";
import { searchSpotifyTracks } from "../api/spotifyAuth";
import { searchJamendoMusic } from "../api/jamendo";
import { getToken } from "../utils/secureStore";

export default function useMusicRecommendations(mood, isSpotifyUser) {
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMusicRecommendations = async () => {
    setLoading(true);
    try {
      if (isSpotifyUser) {
        const jwtToken = await getToken("jwtToken");
        const spotifyResults = await searchSpotifyTracks(mood, jwtToken);
        if (spotifyResults) {
          setMusicData(
            spotifyResults.map((track, index) => ({
              id: track.id || `${track.name}-${index}`,
              title: track.name || "Unknown Title",
              artist: track.artists?.join(", ") || "Unknown Artist",
              image: { uri: track.album?.images?.[0]?.url || "https://via.placeholder.com/300" },
              externalUrl: track.externalUrl,
              previewUrl: track.preview_url,
              duration: track.duration_ms || 0,
              album: track.album?.name || "Unknown Album",
            }))
          );
        }
      } else {
        const jamendoResults = await searchJamendoMusic(mood);
        if (jamendoResults) {
          setMusicData(
            jamendoResults.map((track, index) => ({
              id: track.id || `${track.name}-${index}`,
              title: track.name || "Unknown Title",
              artist: track.artist || "Unknown Artist",
              image: { uri: track.image || "https://via.placeholder.com/300" },
              externalUrl: track.audio,
              previewUrl: track.audio,
              duration: track.duration * 1000,
              album: track.album || "Unknown Album",
            }))
          );
        }
      }
    } catch (error) {
      console.error("Error fetching music recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicRecommendations();
  }, [mood, isSpotifyUser]);

  return { musicData, loading };
}