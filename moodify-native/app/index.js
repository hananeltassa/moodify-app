import React from 'react';
import { SafeAreaView, View, ImageBackground, Image, Text } from 'react-native';
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
        <View className="w-full flex justify-center items-center px-4">
          <Image
            source={images.logoSmall}
            className="w-[130px] h-[84px] mb-8"
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
        {/* Google Button Section */}
        <View className="mt-8 w-full px-6">
          <CustomButton
            icon={icons.google} // Ensure this points to the correct Google icon
            text="Continue with Google"
            backgroundColor="bg-transparent" // Transparent background
            textColor="text-white"
            borderStyle="border border-white"
            onPress={() => console.log('Google button pressed')}
          />
        </View>

      </SafeAreaView>
    </ImageBackground>

  );
}
