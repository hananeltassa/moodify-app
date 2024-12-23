import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';

export default function SignIn() {
  const[form,setForm]= useState({
    email:'',
    password:'',
  })

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


        </View>
    </SafeAreaView>
  );
}