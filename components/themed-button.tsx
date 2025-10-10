import { TouchableOpacity, TouchableOpacityProps, TextStyle, ViewStyle, View } from "react-native";
import { ThemedText } from "./themed-text";
import React from "react";

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

const getButtonStyle = (type?: ButtonType): ViewStyle => {
  switch (type) {
    case "primary":
      return {
        backgroundColor: "#14AE5C",
      };
    case "secondary":
      return {
        backgroundColor: "#565656",
      };
    case "tertiary":
      return {
        backgroundColor: "rgba(82,82,82,0.09)",
      };
    case "social-facebook":
      return {
        backgroundColor: "#1877F2",
      };
    case "social-google":
      return {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#DADCE0",
      };
    case "social-apple":
      return {
        backgroundColor: "#000000",
      };
    default:
      return {};
  }
};

const defaultTextStyle: TextStyle = {
  fontSize: 17,
  fontWeight: "600",
};

const getTextStyle = (type?: ButtonType): TextStyle => {
  switch (type) {
    case "primary":
    case "secondary":
    case "social-facebook":
    case "social-apple":
      return {
        color: "#fff",
      };
    case "tertiary":
      return {
        color: "#222",
      };
    case "social-google":
      return {
        color: "#3C4043",
      };
    default:
      return {};
  }
};

export function ThemedButton({ type, title, leftIcon, style, children, ...otherProps }: ThemedButtonProps) {
  const buttonStyle = getButtonStyle(type);
  const textStyle = getTextStyle(type);

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

