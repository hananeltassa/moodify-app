import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRegistration } from "../../context/RegistrationContext";
import { router } from "expo-router";

export default function SignInBirthday() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    return hasBirthdayPassed ? age : age - 1;
  };

  const handleSubmit = async () => {
    if (!registrationData.birthday) {
      Alert.alert("Error", "Please select your birthday.");
      return;
    }

    const age = calculateAge(registrationData.birthday);

    if (age < 12) {
      Alert.alert("Error", "You must be at least 12 years old to sign up.");
      return;
    }

    setIsSubmitting(true);

    try {
      //console.log("Birthday submitted:", registrationData.birthday);
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
          value={registrationData.birthday}
          handleChangeText={(date) => updateRegistrationData("birthday", date)}
          placeholder="Enter your birthday"
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