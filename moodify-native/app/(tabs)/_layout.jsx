import { Tabs } from 'expo-router';
import { Image, Platform, StatusBar } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
      />

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
                position: 'absolute', // iOS-specific tab bar positioning
              },
            }),
          },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={28} color={color} />
            ),
            tabBarShowLabel: false,
          }}
        />

        {/* Search Tab */}
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => (
              <Ionicons name="search-outline" size={28} color={color} />
            ),
            tabBarShowLabel: false,
          }}
        />

        {/* Challenge Tab */}
        <Tabs.Screen
          name="challenge"
          options={{
            title: 'Challenge',
            tabBarIcon: ({ color }) => (
              <Ionicons name="trophy-outline" size={28} color={color} />
            ),
            tabBarShowLabel: false,
          }}
        />

        {/* Library Tab */}
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

        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={28} color={color} />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    </>
  );
}
