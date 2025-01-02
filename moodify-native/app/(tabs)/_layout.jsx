import { Tabs } from 'expo-router';
import { Image, Platform, StatusBar, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import MiniPlayer from '@/components/MiniPlayer';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  // State for MiniPlayer
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const expandPlayer = () => {
    console.log('Expanding MiniPlayer...');
    // Add logic to navigate to a full music player screen
  };

  return (
    <View className="flex-1 relative">
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={themeColors.background}
      />

      {/* Tabs Navigator */}
      <View className="flex-1">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: themeColors.tint,
            tabBarInactiveTintColor: themeColors.tabIconDefault,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: themeColors.background,
              borderTopWidth: 0,
              elevation: 0,
              height: 80,
              paddingBottom: 30, 
              paddingTop: 10,
              ...Platform.select({
                ios: {
                  position: 'absolute',
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
                <Ionicons name="library-outline" size={size} color={color} />
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
          <Tabs.Screen
            name="playlist/[playlist]"
            options={{
              href: null,
              tabBarShowLabel: false,
            }}
          />
        </Tabs>
      </View>

      {/* MiniPlayer */}
      <View className="absolute bottom-[80px] left-0 right-0 z-10">
        <MiniPlayer
          onExpand={expandPlayer}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
        />
      </View>
    </View>
  );
}
