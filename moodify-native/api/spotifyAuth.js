import * as AuthSession from 'expo-auth-session';
import { SPOTIFY_CLIENT_ID, SPOTIFY_AUTH_ENDPOINT } from '@env';

export const spotifyAuth = async () => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      useProxy: true, // Ensures compatibility with Expo Go
    });

    console.log("Redirect URI:", redirectUri);

    const discovery = {
      authorizationEndpoint: SPOTIFY_AUTH_ENDPOINT,
    };

    const request = new AuthSession.AuthRequest({
      clientId: SPOTIFY_CLIENT_ID,
      scopes: ["user-read-email", "user-read-private"],
      redirectUri,
      responseType: "code",
    });

    const result = await request.promptAsync(discovery);

    if (result.type === "success") {
      console.log("Spotify login successful:", result.params);
      return result.params;
    } else {
      console.log("Spotify login canceled or failed:", result);
      return null;
    }
  } catch (error) {
    console.error("Error during Spotify login:", error);
    throw error;
  }
};
