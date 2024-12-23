import React from 'react';
import { SafeAreaView, View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import images from '../constants/images';
import icons from '../constants/icons';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';

export default function Onboarding() {
  const router = useRouter();
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
        <View className="flex-1 w-full flex justify-center items-center px-4 pt-40 mt-64">
          <Image
            source={images.logoSmall}
            className="w-[100px] h-[64px] mb-8 "
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
            textColor="text-white"
            marginTop="mt-4"
            onPress={() => console.log('Sign Up button pressed')}
          />
          <CustomButton
            icon={icons.spotify}
            text="Continue with Spotify"
            backgroundColor="bg-transparent"
            textColor="text-white"
            borderStyle="border border-white"
            marginTop="mt-4"
            borderWidth={0.5}
            onPress={() => console.log('Spotify button pressed')}
          />
          <CustomButton
            icon={icons.google}
            text="Continue with Google"
            backgroundColor="bg-transparent"
            textColor="text-white"
            borderStyle="border border-white"
            marginTop="mt-4"
            borderWidth={0.5}
            onPress={() => console.log('Google button pressed')}
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
