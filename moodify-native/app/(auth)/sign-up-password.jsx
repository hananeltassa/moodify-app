import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useRegistration } from "../../context/RegistrationContext";

export default function SignUpPassword() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!registrationData.password) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }

    setIsSubmitting(true); // Set loading state to true

    try {
      console.log("Password submitted:", registrationData.password);
      router.push("/(auth)/sign-up-birthdate");
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 -mt-7">
        <FormField
          title="Create your password"
          value={registrationData.password}
          handleChangeText={(password) => updateRegistrationData("password", password)}
          placeholder="Enter your password"
          titleSize={22}
          inputSize={16}
          secureTextEntry
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
          isLoading={isSubmitting} // Pass the loading state
        />
      </View>
    </SafeAreaView>
  );
}
