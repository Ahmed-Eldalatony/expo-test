import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { OnboardingButton } from '../../components/OnboardingButton';

export default function OnboardingSlide() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white gap-8 items-center justify-center dark:bg-primary-900">
      <Image
        source={require('../../assets/images/slide image.png')}
        className="w-full h-60 mb-8"
        resizeMode="contain"
      />
      <Text className="text-2xl font-readexpro-semibold text-primary-800 text-center">
        {t('slide2.description1')}
      </Text>
      <Text className="text-lg font-readexpro-semibold text-primary-200 text-center">
        {t('slide2.description2')}
      </Text>
      <OnboardingButton title={t('next')} onPress={() => router.push('/slide3')} />
    </View>
  );
}
