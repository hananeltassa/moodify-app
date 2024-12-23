import React, { useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

export default function SignUp() {
  const [form, setForm] = useState({ email: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    console.log("Navigating to password screen with email:", form.email);

    // Navigate to the password screen
    router.push("/(auth)/sign-up-password");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full mt-10 px-4">
        <FormField
          title="What's your email?"
          value={form.email}
          handleChangeText={(email) => setForm({ ...form, email })}
          keyboardType="email-address"
          placeholder="Enter your email"
          titleSize={22}
          inputSize={16}
        />

        <CustomButton
          text="Next"
          backgroundColor="bg-white"
          textColor="text-black"
          textSize="text-sm"
          marginTop="mt-8"
          width="w-38"
          borderStyle="border border-white"
          containerStyle="mx-auto py-2 px-3"
          onPress={handleSubmit}
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}