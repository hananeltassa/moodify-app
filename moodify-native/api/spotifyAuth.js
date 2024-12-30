import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import { saveToken } from '../utils/secureStore';
import { SPOTIFY_CLIENT_ID, SPOTIFY_AUTH_ENDPOINT, SPOTIFY_TOKEN_ENDPOINT, BACKEND_BASE_URL } from '@env';

export const spotifyAuth = async () => {
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

      console.log('Tokens received from backend:', backendResponse.data);
      await saveToken('jwtToken', backendResponse.data.token);
      return backendResponse.data; 
    } else {
      console.log('Spotify login canceled or failed:', result);
      return null;
    }
  } catch (error) {
    console.error('Error during Spotify login:', error);
    throw error;
  }
};
