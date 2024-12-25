/**
 * App Color Palette
 * Defines light and dark mode colors for consistent theming across the app.
 */

const tintColorLight = '#FF6100'; // Primary tint color for light mode (Orange)
const tintColorDark = '#FF6100';

export const Colors = {
  light: {
    text: '#11181C', 
    background: '#FFFFFF', 
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  }
};
