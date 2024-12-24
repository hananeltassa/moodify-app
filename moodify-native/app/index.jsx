import React, { useEffect } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import images from '../constants/images';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('Navigating to onboarding...');
    // Navigate to the onboarding screen after 2 seconds
    const timer = setTimeout(() => {
    router.replace('/(mood-detection)/onboarding');
      }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
          source={images.background}
          className="flex-1 w-full h-full"
          resizeMode="cover"
    >
      <View className="absolute inset-0 bg-black opacity-70" />

      <View className="flex-1 w-full flex justify-center items-center mt-20">
        <Image
          source={images.logo}
          className="w-60 h-45"
          resizeMode="contain"
        />
      </View>

    </ImageBackground>
  );
}
