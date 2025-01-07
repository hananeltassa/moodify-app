import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const ChallengeCard = ({ id, title, description, tags, status, onAction }) => {
  const [isDone, setIsDone] = useState(status === "completed");

  const handlePress = () => {
    const newIsDone = !isDone;
    setIsDone(newIsDone);
    onAction(id, newIsDone);
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
        style={{
          backgroundColor: isDone ? "#28a745" : "#FF6100",
          borderRadius: 50,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
        }}
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
