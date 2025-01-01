import React, { useState } from 'react';
import { SafeAreaView, View, ImageBackground, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import images from '../constants/images';
import icons from '../constants/icons';
import CustomButton from '../components/CustomButton';
import { spotifyAuth } from '../api/spotifyAuth';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSpotifyLogin = async () => {
    try {
      const user = await spotifyAuth(dispatch, () => console.log("Spotify authentication started"));
      if (user) {
        console.log('User successfully logged in:', user);
        router.replace('/home');
      } else {
        console.log('Spotify login was canceled.');
        Alert.alert('Login Canceled', 'Spotify login was canceled by the user.');
      }
    } catch (error) {
      console.error('Error during Spotify login:', error);
      Alert.alert('Login Failed', 'Something went wrong during Spotify login. Please try again.');
    } finally {
      setIsLoading(false);
      //console.log("Loading screen is now hidden");
    }
  };
  
  if (isLoading) {
    return <LoadingScreen message="Connecting to Spotify..." />;
  }

  return (
    <ImageBackground
      source={images.background}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* Overlay to darken the background */}
      <View className="absolute inset-0 bg-black opacity-70" />

      <SafeAreaView className="h-full flex justify-between items-center">
        {/* Logo Section */}
        <View className="flex-1 w-full flex justify-center items-center px-4 pt-40 mt-70">
          <Image
            source={images.logoSmall}
            className="w-[100px] h-[64px] mb-8"
            resizeMode="contain"
          />
          <Text className="text-4xl text-white font-Avenir-Bold text-center leading-relaxed">
            Feel It. Hear It.{"\n"}
            Moodify It.
          </Text>
        </View>

        {/* Button Section */}
        <View className="w-full px-6 space-y-4 mb-16">
          <CustomButton
            text="Sign Up"
            backgroundColor="bg-black"
            fontFamily="AvenirNextLTProBold"
            textColor="text-white"
            marginTop="mt-4"
            textSize="text-lg"
            onPress={() => router.push('/(auth)/sign-up')}
          />
          <CustomButton
            icon={icons.spotify}
            text="Continue with Spotify"
            backgroundColor="bg-transparent"
            textColor="text-white"
            fontFamily="AvenirNextLTProBold"
            borderStyle="border border-white"
            textSize="text-lg"
            marginTop="mt-4"
            borderWidth={0.5}
            onPress={handleSpotifyLogin} 
          />

          {/* Log In Link */}
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
            <Text className="text-white text-lg font-Avenir-Bold text-center mt-6">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}