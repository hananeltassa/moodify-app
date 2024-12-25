import React, { useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

export default function SignUpName() {
  const [form, setForm] = useState({ 
    name: "" 
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    console.log("Navigating to password screen with name:", form.name);

    // Uncomment the following line when ready to navigate
    // router.push("/(auth)/sign-up-password");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 mt-4">
        {/* Form Field for Name */}
        <FormField
          title="What's your name?"
          value={form.name}
          handleChangeText={(name) => setForm({ ...form, name })}
          placeholder="Enter your name"
          titleSize={22}
          inputSize={16}
        />

        {/* Next Button */}
        <CustomButton
          text="Create account"
          backgroundColor="bg-white"
          textColor="text-black"
          textSize="text-base"
          marginTop="mt-8"
          width="w-38"
          borderStyle="border border-white"
          containerStyle="mx-auto py-2 px-6"
          onPress={handleSubmit}
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}
