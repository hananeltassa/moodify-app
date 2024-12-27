import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import useBottomPicker from "../../hooks/useBottomPicker";
import { useRegistration } from "../../context/RegistrationContext";
import { router } from "expo-router";

export default function SignUpGender() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const { showPicker, temporaryValue, BottomPicker } = useBottomPicker();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!registrationData.gender) {
      Alert.alert("Error", "Please select your gender.");
      return;
    }
    setIsSubmitting(true);

    try {
      console.log("Gender submitted:", registrationData.gender);
      router.push("/(auth)/sign-up-name");
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full h-full -mt-5 px-8">
        {/* Title */}
        <Text
          className="text-gray-100 font-bold"
          style={{ fontSize: 20, fontFamily: "AvenirNext-Bold" }}
        >
          What's your gender?
        </Text>

        {/* iOS Text Field */}
        {Platform.OS === "ios" && (
          <TouchableOpacity
            onPress={showPicker}
            className="border border-white w-full h-16 px-6 rounded-lg justify-center"
          >
            <Text
              className={`${
                temporaryValue ? "text-white" : "text-gray-400"
              } font-Avenir-Regular`}
            >
              {temporaryValue || "Select your gender"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Bottom Picker */}
        <BottomPicker
          options={[
            { label: "prefer not to say", value: "prefer not to say" },
            { label: "male", value: "male" },
            { label: "female", value: "female" },
          ]}
          onValueChange={(value) => updateRegistrationData("gender", value)}
        />

        {/* Next Button */}
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
