import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";
import { RegistrationProvider } from "../context/RegistrationContext";
import { Provider as ReduxProvider } from "react-redux";

import { useColorScheme } from "@/hooks/useColorScheme";
import store from "../redux/store";
import "../global.css";

import images from "../constants/images";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAssetsLoaded, setAssetsLoaded] = useState(false);

  // Load custom fonts
  const [fontsLoaded, fontLoadingError] = useFonts({
    AvenirNextLTPro: require("../assets/fonts/AvenirNextLTPro-Regular.otf"),
    AvenirNextLTProBold: require("../assets/fonts/AvenirNextLTPro-Bold.otf"),
    AvenirNextLTProDemi: require("../assets/fonts/AvenirNextLTPro-Demi.otf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const preloadImages = async () => {
    const specificImages = [
      images.logo,
      images.background,
      images.logoWhite,
    ];

    const imageAssets = specificImages.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );

    await Promise.all(imageAssets);
  };

  // Load all assets (fonts and selected images)
  useEffect(() => {
    const loadAssets = async () => {
      try {
        if (fontLoadingError) {
          console.error("Font loading error:", fontLoadingError);
          return;
        }

        await preloadImages();

        if (fontsLoaded) {
          setAssetsLoaded(true);
          SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error("Error loading assets:", error);
      }
    };

    loadAssets();
  }, [fontsLoaded, fontLoadingError]);

  if (!isAssetsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
        <RegistrationProvider>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen
                name="music/[music]"
                options={{
                  presentation: "modal",
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(mood-detection)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </RegistrationProvider>
    </ReduxProvider>
  );
}
