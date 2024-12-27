import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { useCustomButton } from "../hooks/useCustomButton";

export default function CustomButton({
  icon,
  text,
  backgroundColor,
  textColor,
  textSize = "text-base",
  borderStyle,
  borderWidth = 1,
  padding = "py-3 px-6",
  cornerRadius = "rounded-full",
  marginTop = "0",
  width = "w-auto",
  containerStyle,
  fontFamily = "AvenirNextLTProDemi", 
  onPress,
  isDisabled = false,
}) {
  const classes = useCustomButton({ backgroundColor, textColor });

  return (
    <TouchableOpacity
      className={`${classes.button} ${borderStyle} ${padding} ${cornerRadius} ${marginTop} ${width} ${containerStyle} flex-row items-center justify-center`}
      onPress={() => {
        console.log("CustomButton pressed");
        if (onPress && !isDisabled) onPress();
      }}
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
      <Text
        className={`${classes.text} ${textSize}`}
        style={{
          fontFamily,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
