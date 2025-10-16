import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

interface DailySummaryCardProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

export const DailySummaryCard = ({ title, subtitle, image }: DailySummaryCardProps) => {
  const backgroundColor = useThemeColor({}, "cardBackground");
  const subtitleColor = useThemeColor({}, "textSecondary");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      
      <View style={styles.labels}>
        <ThemedText style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: subtitleColor }]} numberOfLines={1}>
          {subtitle}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 173,
    gap: 8,
  },
  imageContainer: {
    width: 173,
    height: 173,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  labels: {
    gap: 2,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    letterSpacing: -0.375,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    letterSpacing: -0.065,
    opacity: 0.62,
  },
});

