import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ml-4 mr-4 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-bold mb-4">{title}</Text>

      <View className="border-2 border-white w-full h-16 px-4 rounded-lg flex flex-row items-center">
        <TextInput
          className="flex-1 text-white text-lg leading-tight"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          textAlignVertical="center"
          style={{
            paddingVertical: 0,
          }}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
