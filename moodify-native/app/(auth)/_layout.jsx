import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: 'SignIn' , headerShown: false}} />
      <Stack.Screen name="sign-up" options={{ title: 'SignUp' }} />
    </Stack>
  );
}