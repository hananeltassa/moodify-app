import React, { useState } from "react";
import {
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TextField = ({
  value,
  placeholder,
  handleChangeText,
  inputSize,
  title,
  iconName,
  iconColor = "#7B7B8B",
  iconSize = 24,
  inputStyles = {},
  borderWidth = 1,
  secureTextEntry = false,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureTextEntry = () => {
    setIsSecure((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderColor: "#fff",
          borderWidth,
          borderRadius: 8,
          paddingHorizontal: 15,
          height: 50,
          backgroundColor: "#000",
          ...inputStyles,
        }}
      >
        {/* Optional Icon */}
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{ marginRight: 8 }}
          />
        )}

        {/* Text Input Field */}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          style={{
            flex: 1,
            fontSize: inputSize,
            fontFamily: "AvenirNextLTPro",
            color: "#fff",
            // paddingBottom:4,
            // paddingTop:4,
          }}
          secureTextEntry={isSecure}
          {...props}
        />

        {/* Password Visibility Toggle */}
        {(title === "Password" || title === "Create your password") && (
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <Ionicons
              name={isSecure ? "eye-off" : "eye"}
              size={24}
              color="#7B7B8B"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TextField;
