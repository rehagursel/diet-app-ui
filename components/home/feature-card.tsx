import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

interface FeatureCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export const FeatureCard = ({ title, value, icon, onPress }: FeatureCardProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const secondaryTextColor = useThemeColor({}, "textSecondary");

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={[styles.container, { backgroundColor: `${primaryColor}15` }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={primaryColor} />
      </View>
      
      <View style={styles.content}>
        <ThemedText style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.value, { color: secondaryTextColor }]} numberOfLines={1}>
          {value}
        </ThemedText>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 140,
    minHeight: 164,
    borderRadius: 20,
    padding: 18,
    gap: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  content: {
    gap: 4,
    flex: 1,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    letterSpacing: -0.375,
    lineHeight: 20,
  },
  value: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.normal,
    letterSpacing: -0.075,
    lineHeight: 20,
    opacity: 0.62,
  },
});

