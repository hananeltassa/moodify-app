import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const ChallengeCard = ({ title, description, tags, onAction }) => {
  const [isDone, setIsDone] = useState(false);

  const handlePress = () => {
    setIsDone(!isDone);
    if (!isDone) {
      onAction();
    }
  };

  return (
    <View className="bg-white rounded-xl flex-row items-center mb-4 p-4 shadow-lg">
      {/* Orange Line */}
      <View
        className="h-full w-1 mr-4"
        style={{
          backgroundColor: "#FF6100",
          borderRadius: 2,
        }}
      />

      {/* Content */}
      <View className="flex-1 pr-4">
        <Text className="text-black font-Avenir-Bold text-lg mb-1">{title}</Text>
        <Text className="text-gray-700 text-sm mb-2 font-avenir-regular">{description}</Text>
        <Text className="text-orange-500 text-xs font-avenir-regular">
          {tags.map((tag) => `${tag} `).join(" ")}
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        onPress={handlePress}
        className={`${
          isDone ? "bg-green-500" : "bg-orange-500"
        } rounded-full w-10 h-10 items-center justify-center shadow-md`}
      >
        <Icon
          name={isDone ? "check" : "plus"}
          size={20}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeCard;
