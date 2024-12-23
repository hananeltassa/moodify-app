import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

export default function SignUpPassword() {
  const [form, setForm] = useState({
    password: '',
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    console.log('Password submitted:', form.password);
    // Implement your password submission logic here
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <View className="w-full justify-center h-full">
        <FormField
          title="Enter your password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          placeholder="Enter a secure password"
          titleStyle={{ fontSize: 20, fontFamily: "AvenirNext-Bold", color: "#FFF" }}
          inputStyle={{ fontSize: 16, fontFamily: "AvenirNext-Regular", color: "#FFF" }}
          secureTextEntry
        />

        <CustomButton
          text="Sign Up"
          backgroundColor="bg-white"
          textColor="text-black"
          textSize="text-sm"
          marginTop="mt-8"
          width="w-38"
          borderStyle="border border-white"
          containerStyle="mx-auto py-2 px-3"
          handlePress={submit}
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}
