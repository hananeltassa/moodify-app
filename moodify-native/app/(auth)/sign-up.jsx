import React, { useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRegistration } from "../../context/RegistrationContext";

export default function SignUp() {
  const { registrationData, updateRegistrationData } = useRegistration();
  
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!registrationData.email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    console.log("Email submitted:", registrationData.email);
    router.push("/(auth)/sign-up-password");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 mt-6">
        <FormField
          title="What's your email?"
          value={registrationData.email}
          handleChangeText={(email) => updateRegistrationData("email", email)}
          keyboardType="email-address"
          placeholder="Enter your email"
          fontFamily="AvenirNextLTPro"
          titleSize={22}
          inputSize={16}
        />

        <CustomButton
          text="Next"
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