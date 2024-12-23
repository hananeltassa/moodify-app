import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { useCustomButton } from "../hooks/useCustomButton";

export default function CustomButton({
  icon,
  text,
  backgroundColor,
  textColor,
  borderStyle,
  borderWidth = 1,
  padding = "py-4 px-2",
  cornerRadius = "rounded-full",
  marginTop,
  width = "w-auto", 
  containerStyle,
  onPress,
}) {
  const classes = useCustomButton({ backgroundColor, textColor });

  return (
    <TouchableOpacity
      className={`${classes.button} ${borderStyle} ${padding} ${cornerRadius} ${marginTop} ${width} ${containerStyle} flex-row items-center justify-center`}
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        borderWidth,
      }}
    >
      {/* Icon */}
      {icon && (
        <Image
          source={icon}
          className={classes.icon}
          style={{ width: 24, height: 24, position: "absolute", left: 16 }}
          resizeMode="contain"
        />
      )}
      {/* Text */}
      <Text className={`${classes.text} font-Avenir-Bold`}>{text}</Text>
    </TouchableOpacity>
  );
}
