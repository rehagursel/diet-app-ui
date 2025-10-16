import React from "react";
import { View, StyleSheet } from "react-native";
import { FeatureCard } from "./feature-card";
import { Ionicons } from "@expo/vector-icons";

export interface FeatureItem {
  id: string;
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

interface WeeklyAtGlanceProps {
  features: FeatureItem[];
}

export const WeeklyAtGlance = ({ features }: WeeklyAtGlanceProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {features.map((feature) => (
          <View key={feature.id} style={styles.cardWrapper}>
            <FeatureCard
              title={feature.title}
              value={feature.value}
              icon={feature.icon}
              onPress={feature.onPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
  },
  cardWrapper: {
    flexBasis: "45%",
    flexGrow: 1,
  },
});

