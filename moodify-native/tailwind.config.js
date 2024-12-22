/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        primary: '#FF6100',
        secondary: '#B90039',
      },
      fontFamily: {
        "Avenir-Bold": ["AvenirNextLTProBold", "sans-serif"],
        "avenir-regular": ["AvenirNextLTPro", "sans-serif"],
        "Avenir-Demi": ["AvenirNextLTProDemi", "sans-serif"],
        "SpaceMono": ["SpaceMono", "sans-serif"],
      }

    },
  },
  plugins: [],
}