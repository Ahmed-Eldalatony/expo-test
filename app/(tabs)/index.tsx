// app/_layout.tsx or app/entry.tsx
import React, { useEffect, useState } from 'react';
import {Text, View, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { storage } from '../storage';
import { useRouter } from 'expo-router';
import { colorScheme, useColorScheme } from "nativewind";
// import { ThemedText } from '@/components/ThemedText';
// import Text from 'react-native';

export default function Entry() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    // MMKV is synchronous so we can check immediately
    const seen = storage.getString('hasSeenOnboarding');
    if (seen !== 'true') {
      // Redirect to onboarding if not seen
      // router.replace('/slide1');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

 // Render your main app layout (e.g., Tabs) once loading is complete
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-primary-900">
      {/* <ThemedText>Test Text</ThemedText> */}
      <TouchableOpacity className="dark:bg-primary-800 "  onPress={(prev) => colorScheme.toggle()} >
        <Text className='dark:text-white'>
          Toggle Theme
        </Text>
      </TouchableOpacity>  
    </View>
  );
}
