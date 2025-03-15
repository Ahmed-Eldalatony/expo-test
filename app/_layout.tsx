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
// import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
// import { Text, View } from 'react-native';
import "react-native-reanimated";

import "./global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { hasCompletedOnboarding, storage } from "./storage";

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
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
