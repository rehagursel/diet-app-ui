import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

interface MealCardProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  onAddPress?: () => void;
}

export const MealCard = ({ title, subtitle, image, onPress, onAddPress }: MealCardProps) => {
  const backgroundColor = useThemeColor({}, "cardBackground");
  const subtitleColor = useThemeColor({}, "textSecondary");
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      
      <View style={styles.labels}>
        <View style={styles.titleRow}>
          <ThemedText style={styles.title} numberOfLines={1}>
            {title}
          </ThemedText>
          
          {onAddPress && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddPress}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle" size={16} color={primaryColor} />
            </TouchableOpacity>
          )}
        </View>
        
        <ThemedText style={[styles.subtitle, { color: subtitleColor }]} numberOfLines={1}>
          {subtitle}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 173,
    gap: 10,
  },
  imageContainer: {
    width: 173,
    height: 128,
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    letterSpacing: -0.3,
    lineHeight: 20,
    flex: 1,
  },
  addButton: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    opacity: 0.62,
  },
});

