import {
  useFonts,
  ReadexPro_400Regular,
  ReadexPro_500Medium,
  ReadexPro_600SemiBold,
  ReadexPro_700Bold,
} from "@expo-google-fonts/readex-pro";
import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import { Redirect, Stack } from "expo-router";
import { Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from 'expo-notifications';
import { initializeNotifications } from "@/lib";

import { SchedulableTriggerInputTypes } from "expo-notifications";
import { schedulePrayerNotifications } from '@/utils/notificationScheduler';
import { getPrayerTimes } from '@/utils/adhan-times';

import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import "react-native-reanimated";

import "./global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { storage } from "./storage";
import { platform } from "os";


// import registerBackgroundTask from "@/utils/notificationScheduler";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  initializeNotifications()
  storage.delete("onboardingCompleted"); // Add this line for testing
  console.log("Checking onboarding status in _layout");
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold,
    Amiri_400Regular,
    Amiri_700Bold,
  });

  const storedReminders = storage.getString('reminders');

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    if (loaded) {
      SplashScreen.hideAsync();
      // registerBackgroundTask();
    }
  }, [loaded]);
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
  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     const prayerTimes = getPrayerTimes();
  //
  //     // console.log(prayerTimes)
  //     const prayerTimesExample = {
  //       asr: new Date("Thu Apr 03 2025 01:38:00 GMT+0200"),
  //       dhuhr: new Date("Thu Apr 03 2025 11:39:00 GMT+0200"),
  //       fajr: new Date("Thu Apr 03 2025 03:39:00 GMT+0200"),
  //       isha: new Date("Thu Apr 03 2025 19:29:00 GMT+0200"),
  //       maghrib: new Date("Thu Apr 03 2025 18:14:00 GMT+0200"),
  //     };
  //     await schedulePrayerNotifications(prayerTimesExample);
  //   };
  //
  //   setupNotifications();
  // }, []);
  //
  useEffect(() => {
    const scheduleTestNotification = async () => {
      const now = new Date();
      const targetTime = new Date(now);
      const secondTarget = new Date(now);
      // targetTime.setHours(12); // 3 PM
      // targetTime.setMinutes(20);
      secondTarget.setHours(3); // 3 PM
      secondTarget.setMinutes(48)
      console.log(targetTime)
      //
      // if (targetTime <= now) {
      //   targetTime.setDate(now.getDate() + 1); // Schedule for tomorrow if it's already past 3:49 PM
      //   console.log("hello")
      // }
      //
      // const trigger = targetTime;

      if (Platform.OS === "web") {
        return
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification",
          body: "A notification that should work after two minutes",
        },
        trigger: {
          type: SchedulableTriggerInputTypes.CALENDAR,
          seconds: 170,
        },
      });
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification",
          body: "A notification by selected Time",
        },
        secondTarget,
      });
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Notification",
          body: "A notification by selected Time with a tigger",
        },
        trigger: {
          type: SchedulableTriggerInputTypes.CALENDAR,
          secondTarget,
        }
      });
    };

    scheduleTestNotification();
  }, []);
  // await notifee.createTriggerNotification(
  //   {
  //     title: `Time for ${prayerName} (Before)`,
  //     body: `Reminder: ${prayerName} prayer is in 5 minutes.`,
  //     android: {
  //       channelId: 'prayer-times',
  //       smallIcon: 'ic_launcher', // Ensure this icon is in your resources
  //     },
  //   },
  //   triggerBefore
  // );


  if (!loaded) {
    return null;
  }


  return (
    <>
      {/* {!hasCompletedOnboarding() && <Redirect href="/slide1" />} */}
      <Stack ></Stack>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

