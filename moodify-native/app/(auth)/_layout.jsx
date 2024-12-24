import { Stack, router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/onboarding')} style={{ marginLeft: 0 }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/onboarding')} style={{ marginLeft: 0 }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="sign-up-password" 
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/onboarding')} style={{ marginLeft: 0 }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ), }} />

      <Stack.Screen name="sign-up-birthdate" 
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back('/onboarding')} style={{ marginLeft: 0 }}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ), }} />
    </Stack>
  );
}
