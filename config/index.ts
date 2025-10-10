import Constants from "expo-constants";
import { Platform } from "react-native";

const getDefaultApiUrl = () => {
  if (__DEV__) {
    // For local development
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000/api"; // Android emulator
    }
    return "http://localhost:3000/api"; // iOS simulator and web
  }
  return "https://your-production-api.com/api"; // Production URL
};

const config = {
  API_URL: Constants.expoConfig?.extra?.API_URL || getDefaultApiUrl(),
};

export default config;
