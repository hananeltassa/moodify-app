import React, { useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRegistration } from "../../context/RegistrationContext";
import { registerUser } from "../../api/authService";

export default function SignUpName() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!registrationData.name.trim()) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await registerUser(registrationData);
      Alert.alert("Success", response.message);
      router.push("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 mt-4">
        {/* Form Field for Name */}
        <FormField
          title="What's your name?"
          value={registrationData.name}
          handleChangeText={(name) => updateRegistrationData("name", name)}
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
