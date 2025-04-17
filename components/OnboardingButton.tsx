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
      <LinearGradient
        locations={[0, 1]} // Adjust the first color to take up 70% of the gradient
        start={{ x: 0, y: 1 }}
        colors={['#FFD27D', '#4BE1A0']}
        className='font-readexpro-medium hover:opacity-85 py-2 px-4'
      style={{borderRadius: 6 }}
      >

    <TouchableOpacity 


        style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
        onPress={onPress}
        >

        <Text className="font-readexpro-medium text-shadow text-white text-2xl font-bold" style={[{ writingDirection: 'rtl' }, textStyle]}>
          {title}
        </Text>
    </TouchableOpacity>

      </LinearGradient>
  );
};
