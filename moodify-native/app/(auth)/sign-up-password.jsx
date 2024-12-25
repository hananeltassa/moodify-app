import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

export default function SignUpPassword() {
  const [form, setForm] = useState({
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.password) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    console.log("Password submitted:", form.password);

    router.push("/(auth)/sign-up-birthdate");
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4 -mt-7">
        <FormField
          title="Create your password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
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
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}
