// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useFonts, ReadexPro_400Regular, ReadexPro_500Medium, ReadexPro_600SemiBold, ReadexPro_700Bold } from '@expo-google-fonts/readex-pro';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ThemedText } from '../../components/ThemedText';
// import { completeOnboarding } from '../../storage';
//
// export default function OnboardingSlide() {
//   const [loaded] = useFonts({
//     ReadexPro_400Regular,
//     ReadexPro_500Medium,
//     ReadexPro_600SemiBold,
//     ReadexPro_700Bold
//   });
//
//   useEffect(() => {
//     SplashScreen.preventAutoHideAsync();
//
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);
//
//   const router = useRouter();
//
//   const handleFinish = () => {
//     // Mark onboarding as completed
//     completeOnboarding();
//     // Navigate to the main part of the app
//     router.replace('/(tabs)');
//   };
//
//   if (!loaded) {
//     return null;
//   }
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>You're All Set!</Text>
//       <Text style={styles.description}>
//         Thank you for taking the tour. Enjoy using the app.
//       </Text>
//       <TouchableOpacity onPress={handleFinish}>
//         <LinearGradient
//           colors={['#FFD27D', '#4BE1A0']} // Example gradient colors
//           style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
//           className='font-readexpro-medium py-2 px-4 rounded-lg'
//         >
//           <ThemedText className="font-readexpro-medium text-white text-2xl font-bold" style={{ writingDirection: 'rtl' }}>Get Started</ThemedText>
//         </LinearGradient>
//       </TouchableOpacity>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
//   title: { fontFamily: 'ReadexPro', fontSize: 24, marginBottom: 10 },
//   description: { fontFamily: 'ReadexPro', fontSize: 16, marginBottom: 20 },
// });
