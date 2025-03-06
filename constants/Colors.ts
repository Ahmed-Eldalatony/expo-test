/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#895105';
const tintColorDark = '#FFC73E';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#FFF9E5',
    tabIconDefault: '#A69D7F',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#4C2F08',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#FFF9E5',
    tabIconSelected: tintColorDark,
  },
};
