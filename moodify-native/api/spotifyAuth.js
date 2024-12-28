import * as AuthSession from 'expo-auth-session';
import { SPOTIFY_CLIENT_ID, SPOTIFY_AUTH_ENDPOINT } from '@env';

export const spotifyAuth = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

    const discovery = {
      authorizationEndpoint: SPOTIFY_AUTH_ENDPOINT,
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    const request = new AuthSession.AuthRequest({
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ['user-read-email', 'user-read-private'],
      redirectUri,
      responseType: 'code',
      usePKCE: true,
    });

    await request.makeAuthUrlAsync(discovery);

    const result = await request.promptAsync(discovery);

    if (result.type === 'success') {
      const { code } = result.params;

      const codeVerifier = request.codeVerifier;

      const backendResponse = await fetch('http://11.11.11.12:8080/api/users/spotify/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri, codeVerifier }),
      });

      if (!backendResponse.ok) {
        throw new Error(`Failed to exchange authorization code with backend: ${await backendResponse.text()}`);
      }

      const tokens = await backendResponse.json();
      console.log('Tokens received from backend:', tokens);
      return tokens;
    } else {
      console.log('Spotify login canceled or failed:', result);
      return null;
    }
  } catch (error) {
    console.error('Error during Spotify login:', error);
    throw error;
  }
};
