import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function SearchFilters({ currentType, onChangeType }) {
  const filters = ["track", "playlist"];

  return (
    <View className="flex-row space-x-4 mt-4 gap-3">
      {filters.map((type) => (
        <TouchableOpacity
          key={type}
          className={`px-4 py-2 rounded-full border ${
            currentType === type ? "bg-white" : "bg-transparent"
          }`}
          style={{ borderWidth: 1, borderColor: "white" }}
          onPress={() => onChangeType(type)}
        >
          <Text
            className={`font-semibold ${
              currentType === type ? "text-black" : "text-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
