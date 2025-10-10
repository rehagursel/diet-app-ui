import React from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { ThemedButton } from "./themed-button";
import { AppColors } from "@/constants/theme";

type SocialLoginButtonsProps = {
  onFacebookPress?: () => void;
  onGooglePress?: () => void;
  onApplePress?: () => void;
  buttonStyle?: any;
};

export function SocialLoginButtons({
  onFacebookPress,
  onGooglePress,
  onApplePress,
  buttonStyle,
}: SocialLoginButtonsProps) {
  return (
    <>
      <ThemedButton 
        type="social-facebook" 
        style={buttonStyle}
        leftIcon={<FontAwesome name="facebook" size={20} color="#fff" />}
        title="Continue with Facebook"
        onPress={onFacebookPress}
      />
      <ThemedButton 
        type="social-google" 
        style={buttonStyle}
        leftIcon={<AntDesign name="google" size={20} color={AppColors.social.google} />}
        title="Continue with Google"
        onPress={onGooglePress}
      />
      <ThemedButton 
        type="social-apple" 
        style={buttonStyle}
        leftIcon={<AntDesign name="apple" size={20} color="#fff" />}
        title="Continue with Apple"
        onPress={onApplePress}
      />
    </>
  );
}

