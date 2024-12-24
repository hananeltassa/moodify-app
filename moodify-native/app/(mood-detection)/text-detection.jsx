import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

export default function TextDetection() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log("Submitted text:", text);
  };

  return (
    <View className="justify-start mt-6 px-2">
        <FormField
          title="Share Your Mood"
          value={text}
          placeholder="Type how you feel..."
          handleChangeText={setText}
          inputSize={20}
          multiline
          numberOfLines={4}
          style={{
            height: 100,
            textAlignVertical: "top",
            padding: 10,
          }}
        />
    </View>
  );
}
