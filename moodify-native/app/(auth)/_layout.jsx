import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" 
        options={{ title: 'Login', headerStyle: { backgroundColor: 'black', },headerTintColor: 'white', headerBackTitleVisible: false, }} 
      />
      <Stack.Screen name="sign-up" options={{ title: 'SignUp' }} />
    </Stack>
  );
}