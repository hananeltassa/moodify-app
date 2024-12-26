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
      {/* Content */}
      <View className="flex-1">
        <Text className="text-white font-Avenir-Bold text-lg mb-1">{title}</Text>
        <Text className="text-white text-sm mb-2 p-3 font-avenir-regular">{description}</Text>
        <Text className="text-[#FFB5B5] text-xs font-avenir-regular">
          {tags.map((tag) => `#${tag} `).join(" ")}
        </Text>
      </View>
      
    </View>
  );
};

export default ChallengeCard;
