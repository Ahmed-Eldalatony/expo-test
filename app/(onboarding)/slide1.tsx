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
    <View className="flex-1 bg-white gap-8 items-center justify-center px-4">
      <Image
        source={require('../../assets/images/slide image.png')}
        className="w-full h-60 mb-8"
        resizeMode="contain"
      />
      <Text className="text-4xl leading-snug font-readexpro-semibold text-primary-800 text-center">
        {t('slide1.title')}
      </Text>
      <View className="flex-row justify-between w-full px-4">
        <OnboardingButton title={t("back")} onPress={() => {}} />
        <OnboardingButton title={t('go')} onPress={() => router.push('/slide2')} />
      </View>
    </View>
  );
}
