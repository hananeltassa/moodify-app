import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Link, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

export default function SignIn() {
  const[form,setForm]= useState({
    email:'',
    password:'',
  })

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className= 'bg-black h-full'>
        <View class="w-full justify-center h-full">
          <FormField 
            title="Email" 
            value={form.email}
            handleChangeText={(e) =>setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your email"
          />

          <FormField 
            title="Password" 
            value={form.password}
            handleChangeText={(e) =>setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter your password"
          />

          <CustomButton
            text="Log In"
            backgroundColor="bg-white"
            textColor="text-black"
            marginTop="mt-8"
            width="w-40"
            containerStyle="mx-auto"
            handlePress={submit}
            isLoading={isSubmitting}
          />

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