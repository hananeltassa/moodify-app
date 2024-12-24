import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  titleSize = 20,
  inputSize = 16,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View className={`space-y-2 ml-4 mr-4 ${otherStyles}`}>
      {/* Title */}
      <Text
        className="text-gray-100 font-bold mb-4"
        style={{
          fontSize: titleSize,
          fontFamily: "AvenirNext-Bold",
          color: "#FFF",
        }}
      >
        {title}
      </Text>

      {/* Input Field */}
      <View className="border border-white w-full h-16 px-4 rounded-lg flex flex-row items-center">
        {type === "date" ? (
          // Date Picker Input
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{ flex: 1 }}
          >
            <Text
              style={{
                fontSize: inputSize,
                color: value ? "#FFF" : "#731B1B",
                fontFamily: "AvenirNext-Regular",
              }}
            >
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          // Text Input
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            textAlignVertical="center"
            style={{
              fontSize: inputSize,
              color: "#FFF",
              fontFamily: "AvenirNext-Regular",
              paddingVertical: 0,
              flex: 1,
            }}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
          />
        )}

        {/* Show/Hide Password Icon */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* DateTimePicker */}
      {type === "date" && showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="spinner"
          themeVariant="light"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              handleChangeText(selectedDate.toISOString().split("T")[0]);
            }
          }}
        />
      )}
    </View>
  );
};

export default FormField;
