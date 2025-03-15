import { platformSelect } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode using class strategy
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary-200": "#A69D7F",
        "primary-300": "#EEDCAE",
        "primary-400": "#FFC73E",
        "primary-800": "#895105",
        // 'primary-900': '#4C3C25',
        "primary-900": "#281700",
"secondary-400":"#4BE1A0",
        "secondary-500": "#1F9C5B",
        "secondary-600": "#008E74",
        white: "#FFF9E5",
      },
      fontFamily: {
        "readexpro-regular": ["ReadexPro_400Regular"],
        "readexpro-medium": ["ReadexPro_500Medium"],
        "readexpro-semibold": ["ReadexPro_600SemiBold"],
        "readexpro-bold": ["ReadexPro_700Bold"],
        "amiri-regular": ["Amiri_400Regular"],
        "amiri-regular-italic": ["Amiri_400Regular_Italic"],
        "amiri-bold": ["Amiri_700Bold"],
        "amiri-bold-italic": ["Amiri_700Bold_Italic"],
      },
    },
  },
  plugins: [],
};
