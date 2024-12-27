import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useRegistration } from "../../context/RegistrationContext";
import usePasswordStrength from "../../hooks/usePasswordStrength";

export default function SignUpPassword() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validatePassword, strengthMessage } = usePasswordStrength();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (!registrationData.password) {
      setErrorMessage("Password cannot be empty.");
      return;
    }

    const isPasswordStrong = validatePassword(registrationData.password);

    if (!isPasswordStrong) {
      setErrorMessage(strengthMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Password submitted:", registrationData.password);
      router.push("/(auth)/sign-up-birthdate");
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 -mt-7">
        <FormField
          title="Create your password"
          value={registrationData.password}
          handleChangeText={(password) => {
            updateRegistrationData("password", password);
            setErrorMessage("");
          }}
          placeholder="Enter your password"
          titleSize={22}
          inputSize={16}
          secureTextEntry
        />

        {/* Display the error message */}
        {errorMessage && (
          <Text style={{ color: "red", marginLeft: 15, marginTop: 8 }}>
            {errorMessage}
          </Text>
        )}

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
