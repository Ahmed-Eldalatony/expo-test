import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const OnboardingButton: React.FC<OnboardingButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <LinearGradient
        colors={['#FFD27D', '#4BE1A0']}
        style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
        className='font-readexpro-medium py-2 px-4 rounded-lg'
      >
        <Text className="font-readexpro-medium text-white text-2xl font-bold" style={[{ writingDirection: 'rtl' }, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
