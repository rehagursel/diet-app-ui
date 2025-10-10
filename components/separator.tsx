import React from "react";
import { View, StyleSheet } from "react-native";
import { AppColors, Layout } from "@/constants/theme";

export function Separator() {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  separatorContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: Layout.spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.ui.separator,
    width: "100%",
  },
});

