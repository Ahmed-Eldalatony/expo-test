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
import BackgroundFetch from "react-native-background-fetch";

import { useRouter } from "expo-router";
import { Text } from "react-native";
import { schedulePrayerNotifications } from '@/utils/notificationScheduler';
import { getPrayerTimes } from '@/utils/adhan-times';

import { useEffect, useState } from "react";
import "react-native-reanimated";

import "./global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { storage } from "./storage";

initializeNotifications()

// import registerBackgroundTask from "@/utils/notificationScheduler";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
  const [scheduledNotifications, setScheduledNotifications] = useState()
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
  async function fetchScheduledNotifications() {
    if (Platform.OS === "web") {
      return
    }
    // await Notifications.cancelAllScheduledNotificationsAsync();
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    return scheduled
  }
  useEffect(() => {
    // MMKV is synchronous so we can check immediately
    const seen = storage.getString('hasSeenOnboarding');
    if (seen !== 'true') {
      // Redirect to onboarding if not seen
      // router.replace('/slide1');
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    const setupNotifications = async () => {
      // const prayerTimes = getPrayerTimes();
      const prayerTimes = getTestPrayerTimes()

      await schedulePrayerNotifications(prayerTimes);
    };

    setupNotifications();

    setScheduledNotifications(fetchScheduledNotifications())

  }, []);
  //
  const getTestPrayerTimes = () => {
    const prayerTimesExample = {
      asr: new Date("Mon Apr 14 2025 03:45:00 GMT+0200"),
      dhuhr: new Date("Mon Apr 14 2025 11:39:00 GMT+0200"),
      fajr: new Date("Mon Apr 14 2025 03:39:00 GMT+0200"),
      isha: new Date("Mon Apr 14  2025 01:28:00 GMT+0200"),
      maghrib: new Date("Mon Apr 14 2025 19:07:00 GMT+0200"),
    };
    return prayerTimesExample
  }
  useEffect(() => {
    if (Platform.OS === "web") {
      console.log("No background fetch on web")
      return
    }
    const onEvent = async (taskId: string) => {
      // const prayerTimes = getPrayerTimes();
      const prayerTimes = getTestPrayerTimes();

      // console.log("[BackgroundFetch] task: ", taskId);
      // // Do your background work here

      schedulePrayerNotifications(prayerTimes);

      setScheduledNotifications(fetchScheduledNotifications())
      BackgroundFetch.finish("task")
    };

    const initBackgroundFetch = async () => {
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // minutes
          stopOnTerminate: false,
          startOnBoot: true,
        },
        onEvent,
        (error) => {
          console.warn("[BackgroundFetch] failed to start", error);
        }
      );

      console.log("[BackgroundFetch] configured with status:", status);
    };

    initBackgroundFetch();
  }, []);

  if (!loaded) {
    return null;
  }

  console.log("========", scheduledNotifications)
  return (
    <>
      {/* {!hasCompletedOnboarding() && <Redirect href="/slide1" />} */}

      {/* <Text> */}
      {/*   {scheduledNotifications && JSON.stringify(scheduledNotifications)} */}
      {/* </Text> */}
      <Stack >
      </Stack>
      {/* <StatusBar style="auto" /> */}
    </>
  );
}

