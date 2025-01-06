import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useRegistration } from "../../context/RegistrationContext";
import { registerUser } from "../../api/authService";
import { setUser } from "../../redux/slices/userSlice";

export default function SignUpName() {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!registrationData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setErrorMessage("");
    setSubmitting(true);

    try {
      const response = await registerUser(registrationData);

      dispatch(
        setUser({
          name: response.user.name,
          email: response.user.email,
          profilePic: response.user.profilePic || "",
          gender: response.user.gender || "",
          birthday: response.user.birthday || "",
        })
      );

      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
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
          handleChangeText={(name) => {
            updateRegistrationData("name", name);
            setErrorMessage("");
          }}
          placeholder="Enter your name"
          titleSize={22}
          inputSize={16}
        />
        {/* Error Message */}
        {errorMessage ? (
          <Text className="text-red-500 text-sm mt-2 ml-5">{errorMessage}</Text>
        ) : null}

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
