import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { loginUser } from '../../api/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Both email and password are required.");
      return;
    }

    setSubmitting(true);

    try {
      const data = await loginUser(form.email, form.password);

      // Dispatch user data to Redux
      dispatch(
        setUser({
          name: data.user.name,
          email: data.user.email,
          profilePic: data.user.profilePic,
          gender: data.user.gender || "",
          dateOfBirth: data.user.birthday || "",
        })
      );

      console.log("Dispatch successful, redirecting to home...");
      router.push("/(tabs)/home"); // Navigate to home
    } catch (error) {
      Alert.alert("Login Failed", error.message || "An unexpected error occurred. Please try again.");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-start h-full px-4">
        {/* Email Field */}
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-2"
          keyboardType="email-address"
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-2"
          placeholder="Enter your password"
          secureTextEntry
        />

        {/* Submit Button */}
        <CustomButton
          text="Log In"
          backgroundColor="bg-white"
          textColor="text-black"
          textSize="text-lg"
          marginTop="mt-8"
          width="w-40"
          borderStyle="border border-white"
          containerStyle="mx-auto"
          onPress={submit}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />

        {/* Signup Link */}
        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            className="text-lg font-psemibold text-secondary"
          >
            Signup
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}