import { TouchableOpacity, TouchableOpacityProps, TextStyle, ViewStyle, View } from "react-native";
import { ThemedText } from "./themed-text";
import React from "react";
import { AppColors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type ButtonType = "primary" | "secondary" | "tertiary" | "social-facebook" | "social-google" | "social-apple";

type ThemedButtonProps = TouchableOpacityProps & {
  type?: ButtonType;
  title?: string;
  leftIcon?: React.ReactNode;
};

const defaultButtonStyle: ViewStyle = {
  borderRadius: 48,
  paddingVertical: 14,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

const defaultTextStyle: TextStyle = {
  fontSize: 17,
  fontWeight: "600",
};

export function ThemedButton({ type, title, leftIcon, style, children, ...otherProps }: ThemedButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const inputBackground = useThemeColor({}, 'inputBackground');
  const text = useThemeColor({}, 'text');
  
  const getButtonStyle = (): ViewStyle => {
    switch (type) {
      case "primary":
        return { backgroundColor: primaryColor };
      case "secondary":
        return { backgroundColor: textSecondary };
      case "tertiary":
        return { backgroundColor: inputBackground };
      case "social-facebook":
        return { backgroundColor: AppColors.social.facebook };
      case "social-google":
        return { 
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: AppColors.social.googleBorder,
        };
      case "social-apple":
        return { backgroundColor: AppColors.social.apple };
      default:
        return {};
    }
  };
  
  const getTextStyle = (): TextStyle => {
    switch (type) {
      case "primary":
      case "social-facebook":
      case "social-apple":
        return { color: "#fff" };
      case "secondary":
        return { color: "#fff" };
      case "tertiary":
        return { color: text };
      case "social-google":
        return { color: "#3C4043" };
      default:
        return {};
    }
  };
  
  const buttonStyle = getButtonStyle();
  const textStyle = getTextStyle();

  const renderContent = () => {
    if (title) {
      return (
        <>
          {leftIcon && <View style={{ marginRight: 10 }}>{leftIcon}</View>}
          <ThemedText style={[defaultTextStyle, textStyle]}>{title}</ThemedText>
        </>
      );
    }
    
    return children;
  };

  return (
    <TouchableOpacity 
      style={[
        defaultButtonStyle,
        buttonStyle,
        style,
      ]} 
      {...otherProps}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

