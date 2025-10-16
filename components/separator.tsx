import React from "react";
import { View, StyleSheet } from "react-native";
import { Layout } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export function Separator() {
  const separatorColor = useThemeColor({}, "separator");
  return (
    <View style={styles.separatorContainer}>
      <View style={[styles.separator, { backgroundColor: separatorColor }]} />
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
    width: "100%",
  },
});

