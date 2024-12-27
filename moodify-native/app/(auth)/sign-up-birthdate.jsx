import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRegistration } from "../../context/RegistrationContext";
import { router } from "expo-router";

export default function SignInBirthdate() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!registrationData.birthdate) {
      Alert.alert("Error", "Please select your birthdate.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Birthdate submitted:", registrationData.birthdate);
      router.push("/(auth)/sign-up-gender");

    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full h-full -mt-8 px-4">
        <FormField
          title="What's your date of birth?"
          value={registrationData.birthdate}
          handleChangeText={(date) => updateRegistrationData("birthdate", date)}
          placeholder=""
          titleSize={22}
          inputSize={16}
          type="date"
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
