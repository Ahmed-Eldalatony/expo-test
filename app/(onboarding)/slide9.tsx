import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, ReadexPro_400Regular, ReadexPro_500Medium, ReadexPro_600SemiBold, ReadexPro_700Bold } from '@expo-google-fonts/readex-pro';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function Onboarding1() {
  const [loaded] = useFonts({
    ReadexPro_400Regular,
    ReadexPro_500Medium,
    ReadexPro_600SemiBold,
    ReadexPro_700Bold
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const router = useRouter();

  const handleNext = () => {
    // Navigate to the second page of the tour
    router.push('/slide10');
  };

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App!</Text>
      <Text style={styles.description}>
        This is the first page of our 10-page tour.
      </Text>
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontFamily: 'ReadexPro', fontSize: 24, marginBottom: 10 },
  description: { fontFamily: 'ReadexPro', fontSize: 16, marginBottom: 20 },
});
