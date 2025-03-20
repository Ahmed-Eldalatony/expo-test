// app/_layout.tsx or app/entry.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, ActivityIndicator, Button, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colorScheme, useColorScheme } from "nativewind";
import { initializeNotifications } from '@/lib';
import { storage } from '../storage';
import * as Notifications from 'expo-notifications';

initializeNotifications();;

export default function Entry() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setColorScheme } = useColorScheme();
  const notificationIdentifierRef = useRef<string | null>(null);
  useEffect(() => {
    // MMKV is synchronous so we can check immediately
    const seen = storage.getString('hasSeenOnboarding');
    if (seen !== 'true') {
      // Redirect to onboarding if not seen
      // router.replace('/slide1');
    }
    setLoading(false);
  }, []);


  const scheduleNotification = async (seconds = 1) => {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: { title: "Test", body: "Test body" },
      trigger: { seconds: 2 },
    });
    return identifier;
  };
  const handleShowNotification = () => {
    scheduleNotification();
  };

  const handleScheduleNotification = async () => {
    const id = await scheduleNotification(15);
    notificationIdentifierRef.current = id;
  };

  const handleCancelScheduledNotification = () => {
    const identifier = notificationIdentifierRef.current;
    if (!identifier) return;
    Notifications.cancelScheduledNotificationAsync(identifier);
  };

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
          Toggle Theme
        </Text>
        <Text onPress={() => router.push("/slide7")} className='dark:text-white'>
          go 7
        </Text>
        <Button title="Show notification" onPress={handleShowNotification} />
        <Button title="handle schedule" onPress={handleScheduleNotification} />
        <Button title="handle schedule" onPress={handleCancelScheduledNotification} />
      </TouchableOpacity>
    </View>
  );
}


