export function useCustomButton({ backgroundColor = 'bg-gray-100', textColor = 'text-black' }) {
    const classes = {
      button: `flex-row items-center justify-center ${backgroundColor} py-3 px-4`,
      icon: 'w-4 h-4 mr-2', 
      text: `text-lg font-bold ${textColor}`,
    };
  
    return classes;
}