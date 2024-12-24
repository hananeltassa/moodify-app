import { useState } from "react";
import { Modal, View, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const useBottomPicker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const showPicker = () => setIsVisible(true);
  const hidePicker = () => setIsVisible(false);

  const BottomPicker = ({ options, onValueChange }) => (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={hidePicker}
    >
      <View className="flex-1 justify-end bg-opacity-80">
        <View className="bg-gray-800 w-full items-center py-4 rounded-t-lg">
          {/* Done Button */}
          <TouchableOpacity onPress={hidePicker} className="self-end px-6 mb-2">
            <Text className="text-white font-bold text-lg">Done</Text>
          </TouchableOpacity>

          {/* Scrollable Picker */}
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              setSelectedValue(itemValue);
              onValueChange(itemValue);
            }}
            style={{ color: "white", width: "100%" }}
          >
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );

  return { showPicker, selectedValue, BottomPicker };
};
export default useBottomPicker;
