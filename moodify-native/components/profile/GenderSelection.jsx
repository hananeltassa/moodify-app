import React from "react";
import { View, Text } from "react-native";
import RadioButton from "../RadioButton";

export default function GenderSelection({ selectedGender, onSelectGender }) {
  return (
    <>
      <Text className="text-white text-2xl font-Avenir-Bold mb-2 p-4">Gender</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <RadioButton
          label="Female"
          value="female"
          selectedValue={selectedGender}
          onPress={() => onSelectGender("female")}
          color="#FF4081"
        />
        <RadioButton
          label="Male"
          value="male"
          selectedValue={selectedGender}
          onPress={() => onSelectGender("male")}
          color="#4081FF"
        />
      </View>
    </>
  );
}
