import React, { useState } from "react";
import { View, Text } from "react-native";
import TextField from "./TextField";
import DatePickerField from "./DatePickerField";

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
    setShowDatePicker(false);
    if (selectedDate) {
      handleChangeText(selectedDate.toISOString().split("T")[0]);
    }
  };

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8, ...otherStyles }}>
      <Text
        style={{
          fontSize: titleSize,
          fontFamily: "AvenirNextLTProBold",
          color: "#fff",
          marginBottom: 8,
        }}
      >
        {title}
      </Text>

      {type === "date" ? (
        <DatePickerField
          value={value}
          placeholder={placeholder}
          inputSize={inputSize}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          handleDateChange={handleDateChange}
        />
      ) : (
        <TextField
          value={value}
          placeholder={placeholder}
          handleChangeText={handleChangeText}
          inputSize={inputSize}
          title={title}
          {...props}
        />
      )}
    </View>
  );
};

export default FormField;
