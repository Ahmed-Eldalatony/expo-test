import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';

export default function OnboardingSlide() {
  const { width } = Dimensions.get('window');
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 gap-8  items-center justify-center  dark:bg-primary-900">
      <Image
        source={require('../../assets/images/slide image.png')}
        className="w-full h-60 mb-8"
        resizeMode="contain"
      />
      {/* Arabic Title */}
      <Text className="text-2xl font-readexpro-semibold text-primary-800 text-center">
        {t('slide2.description1')}
      </Text>

    <Text className="text-lg font-readexpro-semibold text-primary-200 text-center">
        {t('slide2.description2')}
      </Text>
      {/* Gradient Button */}
      <TouchableOpacity onPress={() => router.push('/slide3')}>
        <LinearGradient
          colors={['#FFD27D', '#4BE1A0']} // Example gradient colors
          style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
          className='font-readexpro-medium py-2 px-4 rounded-lg'
        >
          <Text className="font-readexpro-medium text-white text-2xl font-bold" style={{ writingDirection: 'rtl' }}>{t('next')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View >
  );
}
