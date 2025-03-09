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
        locations={[0, 1]} // Adjust the first color to take up 70% of the gradient
        start={{ x: 0, y: 1 }}
        colors={['#FFD27D', '#4BE1A0']}
        style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
        className='font-readexpro-medium hover:opacity-85 py-2 px-4 rounded-lg'
      >
        <Text className="font-readexpro-medium text-shadow text-white text-2xl font-bold" style={[{ writingDirection: 'rtl' }, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
