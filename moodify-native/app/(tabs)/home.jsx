import { SafeAreaView, Text, View, Image } from "react-native";
import React from "react";
import images from "../../constants/images"; 

export default function Home() {
  const profilePic = null;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="left-4">
        <Image
          source={
            profilePic
              ? { uri: profilePic }
              : images.user
          }
          className="w-14 h-14 rounded-full border-2 border-white"
          alt="Profile Picture"
        />
      </View>

      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-lg font-avenir-demi">Hello, NativeWind!</Text>
      </View>
    </SafeAreaView>
  );
}
