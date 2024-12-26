import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ChallengeCard = ({ title, description, tags, image, onAction }) => {
  return (
    <View className="bg-[#6E0313] rounded-xl flex-row items-center mb-4 p-2">
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-lg mr-4"
        resizeMode="cover"
      />
      {/* Content */}
      <View className="flex-1 pr-4">
        <Text className="text-white font-Avenir-Bold text-lg mb-1">{title}</Text>
        <Text className="text-white text-sm mb-2 font-avenir-regular">{description}</Text>
        <Text className="text-[#FFB5B5] text-xs font-avenir-regular">
          {tags.map((tag) => `#${tag} `).join(" ")}
        </Text>
      </View>
      {/* Action Button */}
      <TouchableOpacity
        onPress={onAction}
        className="bg-primary rounded-full w-10 h-10 items-center justify-center"
        >
        <Text className="text-white text-xl">+</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default ChallengeCard;
