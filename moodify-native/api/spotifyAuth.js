import axios from "axios";
import * as AuthSession from "expo-auth-session";
import { saveToken } from "../utils/secureStore";
import { SPOTIFY_CLIENT_ID, SPOTIFY_AUTH_ENDPOINT, SPOTIFY_TOKEN_ENDPOINT, BACKEND_BASE_URL } from "@env";
import { setUser } from "../redux/slices/userSlice";

export const spotifyAuth = async (dispatch) => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

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

      const backendResponse = await axios.post(`${BACKEND_BASE_URL}/api/users/spotify/callback`, {
        code,
        redirectUri,
        codeVerifier,
      });

      const { user, token } = backendResponse.data;

      // Save token to secure storage
      await saveToken('jwtToken', token);

      // Dispatch user data to Redux
      dispatch(setUser(user));

      return user;
    } else {
      console.log('Spotify login canceled:', result);
      return null;
    }
  } catch (error) {
    console.error('Error during Spotify login:', error);
    throw error;
  }
};

export const fetchSpotifyPlaylists = async (jwtToken) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/users/spotify/playlists`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response.data.playlists;
  } catch (error) {
    console.error("Error fetching Spotify playlists:", error);
    throw new Error("Failed to fetch Spotify playlists.");
  }
};

export const fetchSpotifyPlaylistTracks = async (playlistId) => {
  try {
    const jwtToken = await getToken("jwtToken");

    if (!jwtToken) {
      throw new Error("User is not logged in.");
    }

    const response = await axios.get(`${BACKEND_BASE_URL}/api/users/spotify/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching Spotify playlist tracks:", error);
    throw error;
  }
};