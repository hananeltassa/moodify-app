import React, { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
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
      
      <CustomButton
        text="Submit"
        backgroundColor="bg-white"
        textColor="text-black"
        padding="py-3 px-6"
        marginTop="mt-8"
        width="w-38"
        borderStyle="border border-white"
        containerStyle="mx-auto py-2 px-6"
        onPress={handleSubmit}
      />
    </View>
  );
}
