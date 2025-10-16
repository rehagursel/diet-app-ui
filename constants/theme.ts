/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Dimensions } from "react-native";

const primary = "#14AE5C";

export const Colors = {
  light: {
    text: "#11181C",
    textSecondary: "#565656",
    textTertiary: "#999999",
    textSubtitle: "#666666",
    background: "#fcfcfc",
    tint: primary,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primary,
    placeholder: "rgba(33,33,33,0.62)",
    separator: "rgba(82,82,82,0.09)",
    inputBackground: "rgba(82,82,82,0.09)",
    border: "#DADCE0",
    profileBg: "#eeeeee",
    primary: primary,
    cardBackground: "#fcfcfc",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#B0B0B0",
    textTertiary: "#808080",
    textSubtitle: "#A0A0A0",
    background: "#1a1a1a",
    tint: primary,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primary,
    placeholder: "rgba(255,255,255,0.5)",
    separator: "rgba(255,255,255,0.1)",
    inputBackground: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.2)",
    profileBg: "#2a2a2a",
    primary: primary,
    cardBackground: "#1a1a1a",
  },
};

// Nunito font families used in the app
export const FontFamilies = {
  light: "Nunito_300Light",
  regular: "Nunito_400Regular",
  medium: "Nunito_500Medium",
  semibold: "Nunito_600SemiBold",
  bold: "Nunito_700Bold",
  extrabold: "Nunito_800ExtraBold",
} as const;

const { width, height } = Dimensions.get("window");

export const AppColors = {
  primary: "#14AE5C" as const,
  social: {
    facebook: "#1877F2",
    google: "#DB4437",
    googleBorder: "#DADCE0",
    apple: "#000000",
  } as const,
};

// Layout constants
export const Layout = {
  maxWidth: 480,
  padding: {
    screen: 16,
    horizontal: 20,
    vertical: 20,
  } as const,
  spacing: {
    xxs: 2,
    xs: 6,
    sm: 8,
    md: 10,
    base: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
} as const;

// Border radius values
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 20,
  xxl: 22,
  full: 48,
  circle: 107.5,
} as const;

// Font sizes
export const FontSizes = {
  xs: 12,
  sm: 13,
  md: 14,
  base: 15,
  lg: 16,
  xl: 17,
  xxl: 20,
  xxxl: 22,
  title: 24,
  hero: 28,
} as const;

// Font weights mapping
export const FontWeights = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

const theme = {
  colors: Colors,
  appColors: AppColors,
  fontFamilies: FontFamilies,
  fontWeights: FontWeights,
  layout: Layout,
  borderRadius: BorderRadius,
  fontSizes: FontSizes,
  dimensions: {
    width,
    height,
  },
};

export default theme;
