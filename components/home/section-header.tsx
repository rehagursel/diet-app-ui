import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

interface SectionHeaderProps {
  title: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
}

export const SectionHeader = ({ title, showSeeAll = false, onSeeAllPress }: SectionHeaderProps) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View style={styles.container}>
      <ThemedText type="sectionHeader" style={styles.title}>{title}</ThemedText>
      
      {showSeeAll && onSeeAllPress && (
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={onSeeAllPress}
          activeOpacity={0.7}
        >
          <ThemedText style={[styles.seeAllText, { color: primaryColor }]}>
            See All
          </ThemedText>
          <Ionicons name="chevron-forward" size={20} color={primaryColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 4,
    minHeight: 76,
  },
  title: {
    letterSpacing: -0.45,
    flex: 1,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    letterSpacing: -0.085,
    lineHeight: 23,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.normal,
  },
});

