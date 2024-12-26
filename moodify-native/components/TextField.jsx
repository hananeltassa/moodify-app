import React from "react";
import {
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
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
  ...props
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#fff",
        borderWidth,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 50,
        backgroundColor: "#000",
        ...inputStyles,
      }}
    >
      {/* Conditionally Render Icon */}
      {iconName && (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={{
            marginRight: 8,
            alignSelf: "center",
          }}
        />
      )}

      {/* Text Input */}
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        style={{
          flex: 1,
          textAlignVertical: "center",
          fontSize: inputSize,
          fontFamily: "AvenirNextLTPro",
          color: "#fff",
        }}
        secureTextEntry={title === "Password"}
        {...props}
      />
    </View>
  </TouchableWithoutFeedback>
);

export default TextField;
