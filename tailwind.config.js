import { platformSelect } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enable dark mode using class strategy
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary-200': '#A69D7F',
        'primary-300': '#EEDCAE',
        'primary-800': '#FFC73E',
        'primary-800': '#895105',
        // 'primary-900': '#4C3C25',
        'secondary-500': '#1F9C5B',
        'white': "#FFF9E5"
      },
      fontFamily: {
        "readexpro-regular": ["ReadexPro_400Regular"],
        "readexpro-medium": ["ReadexPro_500Medium"],
        "readexpro-semibold": ["ReadexPro_600SemiBold"],
        "readexpro-bold": ["ReadexPro_700Bold"],
      },
    },
  },
  plugins: [],
};
