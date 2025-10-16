import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

interface QuickActionChipProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export const QuickActionChip = ({ label, icon, onPress }: QuickActionChipProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: `${primaryColor}15` }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={16} color={textColor} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 22,
    gap: 4,
    minHeight: 28,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: 16,
  },
  iconContainer: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

