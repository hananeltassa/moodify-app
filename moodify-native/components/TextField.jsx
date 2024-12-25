import React from "react";
import { TextInput } from "react-native";

const TextField = ({ value, placeholder, handleChangeText, inputSize, title, ...props }) => (
  <TextInput
    value={value}
    placeholder={placeholder}
    placeholderTextColor="#7B7B8B"
    onChangeText={handleChangeText}
    style={{
      borderColor: "#fff",
      borderWidth: 1,
      height: 50,
      paddingHorizontal: 16,
      borderRadius: 8,
      fontSize: inputSize,
      fontFamily: "AvenirNextLTPro",
      color: "#fff",
    }}
    secureTextEntry={title === "Password"}
    {...props}
  />
);

export default TextField;
