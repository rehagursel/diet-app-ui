import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";

export default function ProgressScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Progress</ThemedText>
        <ThemedText style={styles.subtitle}>
          Track your diet and fitness progress
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

