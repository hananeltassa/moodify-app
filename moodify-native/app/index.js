import React from 'react';
import { SafeAreaView, View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import images from '../constants/images';
import icons from '../constants/icons';
import CustomButton from '../components/CustomButton';

export default function OnboardingScreen() {
  return (
    <ImageBackground
      source={images.background}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* Overlay to darken the background */}
      <View className="absolute inset-0 bg-black opacity-70" />

      <SafeAreaView className="h-full flex justify-center items-center">
        {/* Logo Section */}
        <View className="w-full flex justify-center items-center px-">
          <Image
            source={images.logoSmall}
            className="w-[90px] h-[60px] mb-8"
            resizeMode="contain"
          />
        </View>

        {/* Text Section */}
        <View className="w-full px-6">
          <Text className="text-3xl text-white font-Avenir-Bold text-center leading-relaxed">
            Feel It. Hear It.{"\n"}
            Moodify It.
          </Text>
        </View>

        <View className="mt-4 w-full px-6">
          <CustomButton
            text="Sign Up"
            backgroundColor="bg-black"
            textColor="text-white"
            onPress={() => console.log('sign up button pressed')}
          />
        </View>

        {/* Spotify Button Section */}
        <View className="mt-4 w-full px-6">
          <CustomButton
            icon={icons.spotify}
            text="Continue with Spotify"
            backgroundColor="bg-transparent"
            textColor="text-white"
            borderStyle="border border-white"
            onPress={() => console.log('Spotify button pressed')}
          />
        </View>

        {/* Google Button Section */}
        <View className="mt-4 w-full px-6">
          <CustomButton
            icon={icons.google}
            text="Continue with Google"
            backgroundColor="bg-transparent"
            textColor="text-white"
            borderStyle="border border-white"
            onPress={() => console.log('Google button pressed')}
          />
        </View>


      </SafeAreaView>
    </ImageBackground>

  );
}
