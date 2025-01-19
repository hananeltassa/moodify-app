import React from "react";
import { TouchableOpacity, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomModal from "./CustomModal";

const DatePickerField = ({
  value,
  placeholder,
  inputSize,
  showDatePicker,
  setShowDatePicker,
  handleDateChange,
}) => (
  <>
    <TouchableOpacity
      onPress={() => setShowDatePicker(true)}
      style={{
        borderColor: "#fff",
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: inputSize,
          fontFamily: "AvenirNextLTPro",
          color: value ? "#fff" : "#7B7B8B",
        }}
      >
        {value || placeholder}
      </Text>
    </TouchableOpacity>

    {showDatePicker && (
      Platform.OS === "ios" ? (
        <CustomModal
          value={value}
          setShowDatePicker={setShowDatePicker}
          handleDateChange={handleDateChange}
        />
      ) : (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )
    )}
  </>
);

export default DatePickerField;
