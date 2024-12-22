import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="SignIn" options={{ title: 'SignIn' }} />
      <Stack.Screen name="SignOut" options={{ title: 'SignOut' }} />
    </Stack>
  );
}
