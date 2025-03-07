import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { saveToken } from "../utils/secureStore";
import { SPOTIFY_CLIENT_ID, SPOTIFY_AUTH_ENDPOINT, SPOTIFY_TOKEN_ENDPOINT, BACKEND_BASE_URL } from "@env";
import { setUser } from "../redux/slices/userSlice";

export const spotifyAuth = async (dispatch, setLoading) => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    //const redirectUri = AuthSession.makeRedirectUri({ useProxy: process.env.NODE_ENV === "development", });

    console.log("Generated Redirect URI:", redirectUri);


    const discovery = {
      authorizationEndpoint: SPOTIFY_AUTH_ENDPOINT,
      tokenEndpoint: SPOTIFY_TOKEN_ENDPOINT,
    };

    const request = new AuthSession.AuthRequest({
      clientId: SPOTIFY_CLIENT_ID,
      scopes: [
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
        'user-library-read',
        'user-read-playback-state',
      ],
      redirectUri,
      responseType: 'code',
      usePKCE: true,
    });

    await request.makeAuthUrlAsync(discovery);

    const result = await request.promptAsync(discovery);

    if (result.type === 'success') {
      const { code } = result.params;
      const codeVerifier = request.codeVerifier;

      if (setLoading) setLoading(true);

      const backendResponse = await axios.post(`${BACKEND_BASE_URL}/api/users/spotify/callback`, {
        code,
        redirectUri,
        codeVerifier,
      });

      const { user, token } = backendResponse.data;

      await saveToken('jwtToken', token);

      dispatch(setUser(user));

      return user;
    } else {
      console.log('Spotify login canceled:', result);
      return null;
    }
  } catch (error) {
    console.error('Error during Spotify login:', error);
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};


export const fetchSpotifyPlaylists = async (jwtToken) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/users/spotify/playlists`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response.data.playlists;
  } catch (error) {
    //console.error("Error fetching Spotify playlists:", error);
    throw new Error("Failed to fetch Spotify playlists.");
  }
};

export const fetchSpotifyPlaylistTracks = async (playlistId, jwtToken) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/users/spotify/playlists/${playlistId}/tracks`, {
      headers: { 
        Authorization: `Bearer ${jwtToken}` 
      },
    });

    //console.log(JSON.stringify(response.data, null, 2));

    return response.data.tracks;
  } catch (error) {
    //console.error("Error fetching Spotify playlist tracks:", error);
    throw error;
  }
};

export const playSpotify = async (jwtToken , payload = {}) => {
  try {
    await axios.put(`${BACKEND_BASE_URL}/api/users/spotify/play`,
      payload, 
      { 
        headers: { 
          Authorization: `Bearer ${jwtToken}` 
        } 
      }
    );
    //console.log("Playback started successfully.");
  } catch (error) {
    //console.error("Error starting playback:", error.response?.data || error.message);
    throw error;
  }
};

export const pauseSpotify = async (jwtToken) => {
  try {
    await axios.put(`${BACKEND_BASE_URL}/api/spotify/pause`, 
      {}, 
      { 
        headers: { 
          Authorization: `Bearer ${jwtToken}` 
        } 
      }
    );
    //console.log("Playback paused successfully.");
  } catch (error) {
    //console.error("Error pausing playback:", error.response?.data || error.message);
    throw error;
  }
};

export const skipToNextSpotify = async (jwtToken) => {
  try {
    await axios.post(`${BACKEND_BASE_URL}/api/spotify/next`, 
      {}, 
      { 
        headers: { 
        Authorization: `Bearer ${jwtToken}` 
        } 
      }
    );
    //console.log("Skipped to next track successfully.");
  } catch (error) {
    //console.error("Error skipping to next track:", error.response?.data || error.message);
    throw error;
  }
};

export const skipToPreviousSpotify = async (jwtToken) => {
  try {
    await axios.post(`${BACKEND_BASE_URL}/api/spotify/previous`, 
      {}, 
      { 
        headers: { 
          Authorization: `Bearer ${jwtToken}` 
        } 
      }
    );
    //le.log("Skipped to previous track successfully.");
  } catch (error) {
    //console.error("Error skipping to previous track:", error.response?.data || error.message);
    throw error;
  }
};

export const searchSpotifyTracks = async (query, jwtToken, type = "track") => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/users/spotify/search`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
      params: { query, type },
    });

    //console.log(`Search results for ${type}:`, response.data.results);
    return response.data.results[type === "track" ? "tracks" : "playlists"];
  } catch (error) {
    //console.error(`Error fetching Spotify ${type} results:`, error.response?.data || error.message);
    throw new Error(`Failed to fetch ${type} search results.`);
  }
};