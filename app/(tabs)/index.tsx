// app/_layout.tsx or app/entry.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator, Button, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colorScheme } from "nativewind";
import { storage } from '../storage';

import { schedulePrayerNotifications } from '@/utils/notificationScheduler';
import { getPrayerTimes } from '@/utils/adhan-times';

export default function Entry() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // MMKV is synchronous so we can check immediately
    const seen = storage.getString('hasSeenOnboarding');
    if (seen !== 'true') {
      // Redirect to onboarding if not seen
      // router.replace('/slide1');
    }
    setLoading(false);
  }, []);
console.log("loading",loading)
  useEffect(() => {
    const setupNotifications = async () => {
      const prayerTimes = getPrayerTimes();
      console.log("prayerTimes", prayerTimes);
      // const prayerTimes = {
      //   ""
      // };
      await schedulePrayerNotifications(prayerTimes);
    };

    setupNotifications();
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
      <TouchableOpacity className="dark:bg-primary-800 " onPress={(prev) => colorScheme.toggle()} >
        <Text className='dark:text-white'>
          Toggleee Theme
        </Text>
        <Text onPress={() => router.push("/slide7")} className='dark:text-white'>
          go 7
        </Text>
      </TouchableOpacity>
    </View>
  );
}


