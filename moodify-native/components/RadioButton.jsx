import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RadioButton = ({ label, value, selectedValue, onPress, color = "#FF6100" }) => {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
    >
      {/* Outer Circle */}
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isSelected ? color : "#B0B0B0",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        {/* Inner Circle */}
        {isSelected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: color,
            }}
          />
        )}
      </View>

      {/* Label */}
      <Text style={{ fontSize: 16, color: "#fff" }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
