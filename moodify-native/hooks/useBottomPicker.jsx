import { useState } from "react";
import { View, Modal, TouchableOpacity, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const useBottomPicker = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [temporaryValue, setTemporaryValue] = useState(""); // Separate state for iOS display
  const [isVisible, setIsVisible] = useState(false); // Modal visibility for iOS

  const showPicker = () => {
    if (Platform.OS === "ios") setIsVisible(true); // Show modal for iOS
  };

  const hidePicker = () => {
    if (Platform.OS === "ios") {
      setTemporaryValue(selectedValue); // Update temporary value when picker is closed
      setIsVisible(false); // Hide modal
    }
  };

  const BottomPicker = ({ options, onValueChange }) => {
    return (
      <View>
        {Platform.OS === "ios" ? (
          // iOS Modal Picker
          <Modal
            transparent
            animationType="slide"
            visible={isVisible}
            onRequestClose={hidePicker}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "#000",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 16,
                }}
              >
                {/* Done Button */}
                <TouchableOpacity
                  onPress={() => {
                    hidePicker();
                    if (onValueChange) onValueChange(selectedValue); // Notify parent of final value
                  }}
                  style={{
                    alignSelf: "flex-end",
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>
                    Done
                  </Text>
                </TouchableOpacity>

                {/* Picker */}
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)} // Update selected value
                  style={{
                    width: "100%",
                    backgroundColor: "#000",
                    color: "#FFF",
                  }}
                >
                  {options.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      style={{
                        color: "#FFF",
                        backgroundColor: "#000",
                      }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
        ) : (
          // Android Dropdown Picker (untouched)
          <View
            style={{
              borderWidth: 1,
              borderColor: "#FFF",
              borderRadius: 8,
              overflow: "hidden",
              marginVertical: 8,
            }}
          >
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => {
                setSelectedValue(itemValue);
                if (onValueChange) onValueChange(itemValue); // Notify parent of the change
              }}
              mode="dropdown" // Dropdown for Android
              style={{
                color: "#FFF",
                backgroundColor: "#000",
              }}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  style={{
                    color: "#FFF",
                    backgroundColor: "#000",
                  }}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
    );
  };

  return { selectedValue, temporaryValue, BottomPicker, showPicker, hidePicker };
};

export default useBottomPicker;
