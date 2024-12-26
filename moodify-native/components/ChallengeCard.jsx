import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ChallengeCard = ({ title, description, tags, image, onAction }) => {
  return (
    <View className="bg-[#6E0313] rounded-xl flex-row items-center mb-4">
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="cover"
      />
    </View>
  );
};

export default ChallengeCard;
