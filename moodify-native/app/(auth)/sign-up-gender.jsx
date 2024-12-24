import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import useBottomPicker from "../../hooks/useBottomPicker";
import { router } from "expo-router";

export default function SignUpGender() {
  const { showPicker, temporaryValue, BottomPicker } = useBottomPicker();
  const [form, setForm] = useState({ gender: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.gender) {
      Alert.alert("Error", "Please select your gender.");
      return;
    }
    setIsSubmitting(true);

    try {
      console.log("Gender submitted:", form.gender);
      router.push("/(auth)/sign-up-name");
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="w-full h-full -mt-5 px-4">
        {/* Title */}
        <Text
          className="text-gray-100 font-bold mb-4"
          style={{ fontSize: 20, fontFamily: "AvenirNext-Bold" }}
        >
          What's your gender?
        </Text>

        {/* iOS Text Field */}
        {Platform.OS === "ios" && (
          <TouchableOpacity
            onPress={showPicker}
            className="border border-white w-full h-16 px-4 rounded-lg justify-center"
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
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" },
          ]}
          onValueChange={(value) =>
            setForm((prevForm) => ({ ...prevForm, gender: value }))
          }
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
