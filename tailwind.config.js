import { platformSelect } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary-800': '#895105',
        'custom-black': '#000000',
        'custom-blue': '#007AFF',
        'custom-green': '#34C759',
        'custom-red': '#FF3B30',
        'custom-yellow': '#FFCC00',
        'custom-gray': '#8E8E93',
        'custom-light-gray': '#F2F2F7',
        'custom-dark-gray': '#1C1C24',
        'custom-purple': '#5856D6',
        'custom-orange': '#FF9500',
        'custom-pink': '#FF2D55',
        'custom-brown': '#A2845E',
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
