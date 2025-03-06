import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

import { colorScheme, useColorScheme } from "nativewind";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme.colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme.colorScheme ?? 'light'].tabIconDefault, // inactive icon color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View className='bg-primary-300 dark:bg-primary-800' style={[StyleSheet.absoluteFill]} />
        ),
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
