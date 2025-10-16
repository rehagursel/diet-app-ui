import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";

export default function MealsScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Meals</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your meal tracking and history will appear here
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: FontSizes.hero,
    fontWeight: FontWeights.bold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FontSizes.base,
    opacity: 0.6,
    textAlign: "center",
  },
});

