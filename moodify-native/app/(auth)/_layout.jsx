import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const commonScreenOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: 'white',
  headerBackTitleVisible: false,
  headerLeft: () => (
    <TouchableOpacity style={{ marginLeft: 0 }}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
  ),
};

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          title: 'Login',
          ...commonScreenOptions,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Create account',
          ...commonScreenOptions,
        }}
      />
      <Stack.Screen
        name="sign-up-password"
        options={{
          title: 'Create account',
          ...commonScreenOptions,
        }}
      />
      <Stack.Screen
        name="sign-up-birthdate"
        options={{
          title: 'Create account',
          ...commonScreenOptions,
        }}
      />
    </Stack>
  );
}
