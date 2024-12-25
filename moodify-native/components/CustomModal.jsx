import React from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomModal = ({ value, setShowDatePicker, handleDateChange }) => (
  <Modal
    transparent
    animationType="slide"
    visible={true}
    onRequestClose={() => setShowDatePicker(false)}
  >
    <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <View
        style={{
          backgroundColor: "#333",
          padding: 16,
          alignItems: "center",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowDatePicker(false)}
          style={{ alignSelf: "flex-end", marginBottom: 10 }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontFamily: "AvenirNextLTProBold" }}>
            Done
          </Text>
        </TouchableOpacity>
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
);

export default CustomModal;
