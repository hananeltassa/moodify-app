import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    if (selectedDate) handleChangeText(selectedDate.toISOString().split("T")[0]);
  };

  return (
    <View className={`space-y-2 mx-4 ${otherStyles}`}>
      {/* Title */}
      <Text
        className="text-gray-100 font-bold mb-4"
        style={{ fontSize: titleSize, fontFamily: "AvenirNext-Bold" }}
      >
        {title}
      </Text>

      {/* Input or Date Picker Trigger */}
      {type === "date" ? (
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="border border-white w-full h-16 px-4 rounded-lg justify-center"
        >
          <Text
            className={`${value ? "text-white" : "text-gray-400"} font-regular`}
            style={{ fontSize: inputSize, fontFamily: "AvenirNext-Regular" }}
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
          className="border-white border-[0.5px] w-full h-16 px-4 rounded-lg text-white"
          style={{ fontSize: inputSize, fontFamily: "AvenirNext-Regular" }}
          secureTextEntry={title === "Password"}
          {...props}
        />
      )}

      {/* Date Picker Modal */}
      {type === "date" && showDatePicker && (
        <Modal
          transparent
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View className="flex-1 justify-end bg-opacity-80">
            <View className="bg-gray-800 w-full items-center py-4">
              {/* Done Button */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                className="self-end px-6 mt-2"
              >
                <Text className="text-white font-bold text-lg">Done</Text>
              </TouchableOpacity>

              {/* Date Picker */}
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) handleChangeText(selectedDate.toISOString().split("T")[0]);
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
