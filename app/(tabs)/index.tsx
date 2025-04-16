// app/_layout.tsx or app/entry.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator, Button, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colorScheme } from "nativewind";
import { storage } from '../storage';

import * as Notifications from 'expo-notifications';
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
  console.log("loading", loading)
  useEffect(() => {
    const setupNotifications = async () => {
      const prayerTimes = getPrayerTimes();
      console.log("prayerTimes", prayerTimes);

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
  const callNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "A notification that should work after two minutes",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  }

  // const callNotification2 = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Test Notification",
  //       body: "A notification that should work after two minutes",
  //     },
  //     trigger: {
  //       type: Notifications.SchedulableTriggerInputTypes.DATE,
  //       seconds: 2,
  //     },
  //   });
  // }
  // Render your main app layout (e.g., Tabs) once loading is complete


  // async function isNotificationScheduledAt(targetDate) {
  //   // Fetch all scheduled notifications
  //   const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  // }
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-primary-900">
      <TouchableOpacity className="dark:bg-primary-800 " onPress={(prev) => colorScheme.toggle()} >
        <Text className='dark:text-white'>
          Toggleee Theme
        </Text>
        <Text onPress={() => router.push("/slide9")} className='text-xl dark:text-white'>
          go 7
        </Text>
    <Text onPress={() => router.push("/slide8")} className='text-xl dark:text-white'>
          go 8
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={callNotification} >
        <Text>
          Send Notification
        </Text>
      </TouchableOpacity>
    </View>
  );
}


