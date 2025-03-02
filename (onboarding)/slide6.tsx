import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding1() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to the second page of the tour
    router.push('/(onboarding)/slide7');
  };

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
  title: { fontSize: 24, marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
});
