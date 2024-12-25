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
    setShowDatePicker(Platform.OS === "ios"); // Keep the picker open on iOS
    if (selectedDate) {
      handleChangeText(selectedDate.toISOString().split("T")[0]);
    }
  };

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8, ...otherStyles }}>
      {/* Title */}
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

      {/* Input or Date Picker Trigger */}
      {type === "date" ? (
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
      ) : (
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
      )}

      {/* Date Picker */}
      {showDatePicker && (
        Platform.OS === "ios" ? (
          <Modal
            transparent
            animationType="slide"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
              <View style={{ backgroundColor: "#333", padding: 16, alignItems: "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                {/* Done Button */}
                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  style={{ alignSelf: "flex-end", marginBottom: 10 }}
                >
                  <Text style={{ color: "#fff", fontSize: 16, fontFamily: "AvenirNextLTProBold", }}>Done</Text>
                </TouchableOpacity>
                {/* Date Picker */}
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  textColor="#FFF"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={value ? new Date(value) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )
      )}
    </View>
  );
};

export default FormField;
