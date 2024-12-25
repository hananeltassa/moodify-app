import { Tabs } from 'expo-router';
import { Image, Platform } from 'react-native';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme(); // Detect 'light' or 'dark'
  console.log('Detected Color Scheme:', colorScheme);

  // Dynamically apply colors based on the system theme
  const themeColors = Colors[colorScheme ?? 'light']; // Default to 'light' if undefined

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.tint,
        tabBarInactiveTintColor: themeColors.tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopWidth: 0,
          elevation: 0,
          ...Platform.select({
            ios: {
              position: 'absolute',
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy.fill" color={color} />,
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/icons/library.png')}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
