import {
  useFonts,
  ReadexPro_400Regular,
  ReadexPro_500Medium,
  ReadexPro_600SemiBold,
  ReadexPro_700Bold,
} from "@expo-google-fonts/readex-pro";
import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { schedulePrayerNotifications } from '@/utils/notificationScheduler';
import { getPrayerTimes } from '@/utils/adhan-times';


import { useRouter } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import "react-native-reanimated";

import "./global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { storage } from "./storage";

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
  // useEffect(() => {
  //   registerBackgroundTask();
  // }, []);
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
  console.log("loading", loading)
  useEffect(() => {
    const setupNotifications = async () => {
      const prayerTimes = getPrayerTimes();

      console.log(prayerTimes)
      const prayerTimesExample = {
        asr: new Date("Tue Apr 01 2025 01:38:00 GMT+0200"),
        dhuhr: new Date("Tue Apr 01 2025 12:01:00 GMT+0200"),
        fajr: new Date("Tue Apr 01 2025 03:39:00 GMT+0200"),
        isha: new Date("Tue Apr 01 2025 19:29:00 GMT+0200"),
        maghrib: new Date("Tue Apr 01 2025 18:14:00 GMT+0200"),
      };
      await schedulePrayerNotifications(prayerTimesExample);
    };

    setupNotifications();
  }, []);


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

