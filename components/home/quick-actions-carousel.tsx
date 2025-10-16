import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { QuickActionChip } from "./quick-action-chip";
import { Ionicons } from "@expo/vector-icons";

export interface QuickAction {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface QuickActionsCarouselProps {
  actions: QuickAction[];
}

export const QuickActionsCarousel = ({ actions }: QuickActionsCarouselProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action) => (
          <QuickActionChip
            key={action.id}
            label={action.label}
            icon={action.icon}
            onPress={action.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
});

