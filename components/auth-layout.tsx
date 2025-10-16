import React from "react";
import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { ThemedView } from "./themed-view";
import { authCommonStyles } from "@/styles/auth-styles";

type AuthLayoutProps = {
  children: React.ReactNode;
  scrollContentStyle?: any;
};

export function AuthLayout({ children, scrollContentStyle }: AuthLayoutProps) {
  return (
    <ThemedView safeAreaTop safeAreaBottom style={authCommonStyles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={authCommonStyles.maxWidthContainer}>
        <ScrollView 
          contentContainerStyle={[authCommonStyles.scrollContent, scrollContentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </ThemedView>
  );
}

