import { useState, useEffect } from "react";
import { searchJamendoMusic } from "../api/jamendo";

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 18) return "Afternoon";
  return "Evening";
};

const usePersonalizedRecommendations = (mood) => {
  const [personalizedData, setPersonalizedData] = useState({ title: "", tracks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalizedData = async () => {
      setLoading(true);
      try {
        const timeOfDay = getTimeOfDay();
        let tags = mood;

        if (timeOfDay === "Morning") tags += ", energetic";
        if (timeOfDay === "Afternoon") tags += ", chill";
        if (timeOfDay === "Evening") tags += ", relaxing";

        const jamendoResults = await searchJamendoMusic(tags);

        if (jamendoResults) {
          const tracks = jamendoResults.map((track, index) => ({
            id: track.id || `${track.name}-${index}`,
            title: track.name || "Unknown Title",
            artist: track.artist || "Unknown Artist",
            image: { uri: track.image || "https://via.placeholder.com/300" },
            externalUrl: track.audio,
            previewUrl: track.audio,
            duration: track.duration * 1000,
            album: track.album || "Unknown Album",
          }));

          setPersonalizedData({
            title: `${timeOfDay} ${mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes`,
            tracks,
          });
        }
      } catch (error) {
        console.error("Error fetching personalized recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalizedData();
  }, [mood]);

  return { personalizedData, loading };
};

export default usePersonalizedRecommendations;
