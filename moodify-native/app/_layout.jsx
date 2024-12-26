import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded, fontLoadingError] = useFonts({
    AvenirNextLTPro: require("../assets/fonts/AvenirNextLTPro-Regular.otf"),
    AvenirNextLTProBold: require("../assets/fonts/AvenirNextLTPro-Bold.otf"),
    AvenirNextLTProDemi: require("../assets/fonts/AvenirNextLTPro-Demi.otf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontLoadingError) {
      console.error("Font loading error:", fontLoadingError);
      return;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontLoadingError]);

  // Wait for fonts to load before rendering
  if (!fontsLoaded && !fontLoadingError) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="playlist/[playlist]" options={{ headerShown: false }} />
          <Stack.Screen name="music/[music]" options={{ headerShown: false }} />
          <Stack.Screen name="(mood-detection)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
