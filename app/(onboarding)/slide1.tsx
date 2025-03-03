import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import { useFonts, ReadexPro_400Regular, ReadexPro_500Medium, ReadexPro_600SemiBold, ReadexPro_700Bold } from '@expo-google-fonts/readex-pro';
//import * as SplashScreen from 'expo-splash-screen';
//import { useEffect } from 'react';
//
export default function RamadanScreen() {
  const { width } = Dimensions.get('window');

  return (
    <View className="flex-1 gap-8 bg-white items-center justify-center">
      <Image
        source={require('../../assets/images/slide image.png')}
        className="w-full h-60 mb-8"
        resizeMode="contain"
      />

      {/* Arabic Title */}
      <Text className="text-3xl font-readexpro-medium text-primary-800 text-center">
        مكانك الأفضل لتتبع عباداتك في رمضان
      </Text>

      {/* Gradient Button */}
      <TouchableOpacity onPress={() => alert('Button Pressed!')}>
        <LinearGradient
          colors={['#FFD27D', '#4BE1A0']} // Example gradient colors
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
          className='font-readexpro-medium py-2 px-4 rounded-lg'
        >
          <Text className=" font-readexpro-medium text-white  text-2xl font-bold text-2xl font-bold" style={{ writingDirection: 'rtl' }}>انطلق</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View >
  );
}
