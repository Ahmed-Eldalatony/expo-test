import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from 'expo-router';

import { ThemedText } from '../../components/ThemedText';
export default function OnboardingSlide() {
  const { width } = Dimensions.get('window');
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 gap-8 items-center justify-center bg-white dark:bg-primary-900">
      <Image
        source={require('../../assets/images/slide image.png')}
        className="w-full h-60 mb-8"
        resizeMode="contain"
      />

      {/* Arabic Title */}
      <ThemedText className="text-4xl leading-snug font-readexpro-semibold text-primary-800 text-center">
        {t('slide1.title')}
      </ThemedText>

      {/* Gradient Button */}
      <TouchableOpacity onPress={() => router.push('/slide2')}>
        <LinearGradient
          colors={['#FFD27D', '#4BE1A0']} // Example gradient colors
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
          className='font-readexpro-medium py-2 px-4 rounded-lg'
        >
          <ThemedText className="font-readexpro-medium text-white text-2xl font-bold" style={{ writingDirection: 'rtl' }}>{t('go')}</ThemedText>
        </LinearGradient>
      </TouchableOpacity>
    </View >
  );
}
