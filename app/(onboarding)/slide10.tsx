import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { storage } from '../storage';
import { useRouter } from 'expo-router';
import { useFonts, ReadexPro_400Regular, ReadexPro_500Medium, ReadexPro_600SemiBold, ReadexPro_700Bold } from '@expo-google-fonts/readex-pro';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';


export default function Onboarding10() {
    const router = useRouter();

    const handleFinish = () => {
        // Mark onboarding as completed
        completeOnboarding();
        // Navigate to the main part of the app
        router.replace('/hello');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You're All Set!</Text>
            <Text style={styles.description}>
                Thank you for taking the tour. Enjoy using the app.
            </Text>
            <Button title="Get Started" onPress={handleFinish} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontFamily: 'ReadexPro', fontSize: 24, marginBottom: 10 },
  description: { fontFamily: 'ReadexPro', fontSize: 16, marginBottom: 20 },
});
