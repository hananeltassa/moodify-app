import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRegistration } from "../../context/RegistrationContext";
import useEmailValidation from "../../hooks/useEmailValidation";

export default function SignUp() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const { validateEmail, validationMessage } = useEmailValidation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const processedEmail = registrationData.email.toLowerCase(); // Convert email to lowercase

    if (!validateEmail(processedEmail)) {
      setErrorMessage(validationMessage); // Set validation message if invalid
      return;
    }

    // Update the registration data with the processed email
    updateRegistrationData("email", processedEmail);

    setSubmitting(true);

    try {
      console.log("Email submitted:", processedEmail);
      router.push("/(auth)/sign-up-password");
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 mt-6">
        <FormField
          title="What's your email?"
          value={registrationData.email}
          handleChangeText={(email) => {
            updateRegistrationData("email", email);
            setErrorMessage("");
          }}
          keyboardType="email-address"
          placeholder="Enter your email"
          fontFamily="AvenirNextLTPro"
          titleSize={22}
          inputSize={16}
        />

        {/* Display validation message on press Next */}
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
