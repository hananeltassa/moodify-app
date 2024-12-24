import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Modal } from "react-native";

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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) {
      handleChangeText(selectedDate.toISOString().split("T")[0]);
    }
  };

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
      {type === "date" ? (
        <TouchableOpacity
          className="border border-white w-full h-16 px-4 rounded-lg flex justify-center"
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            className={`${
              value ? "text-white" : "text-black"
            } font-regular`}
            style={{
              fontSize: inputSize,
              fontFamily: "AvenirNext-Regular",
            }}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          textAlignVertical="center"
          className="border border-white w-full h-16 px-4 rounded-lg text-white"
          style={{
            fontSize: inputSize,
            fontFamily: "AvenirNext-Regular",
            paddingVertical: 0,
          }}
          secureTextEntry={title === "Password"}
          {...props}
        />
      )}

    {type === "date" && (
      <Modal
        transparent={true}
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View className="flex-1 justify-end items-center bg-opacity-80">
          
          <View className="bg-black rounded-t-lg w-1/2 items-center mb-4 py-4">
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  handleChangeText(selectedDate.toISOString().split("T")[0]);
                }
              }}
              textColor="#FFF" 
            />
          </View>
        </View>
      </Modal>
    )}
    </View>
  );
};

export default FormField;