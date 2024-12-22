/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        primary: '#FF6100',
        secondary: '#B90039',
        light: {
          text: '#11181C',
          background: '#fff',
          tint: '#0a7ea4',
          icon: '#687076',
          tabIconDefault: '#687076',
          tabIconSelected: '#0a7ea4',
        },
        dark: {
          text: '#ECEDEE',
          background: '#151718',
          tint: '#fff',
          icon: '#9BA1A6',
          tabIconDefault: '#9BA1A6',
          tabIconSelected: '#fff',
        },
      },
      fontFamily: {
        "Avenir-Bold": ["AvenirNextLTProBold", "sans-serif"],
        "avenir-regular": ["AvenirNextLTPro", "sans-serif"],
        "Avenir-Demi": ["AvenirNextLTProDemi", "sans-serif"],
        "SpaceMono": ["SpaceMono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
