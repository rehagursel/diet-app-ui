import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

interface TipCardProps {
  title: string;
  description: string;
  author: string;
  date: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

export const TipCard = ({ title, description, author, date, image, onPress }: TipCardProps) => {
  const backgroundColor = useThemeColor({}, "cardBackground");
  const secondaryTextColor = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor({}, "border");

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor, borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.metadata}>
          <ThemedText style={[styles.author, { fontWeight: FontWeights.medium }]} numberOfLines={1}>
            {author}
          </ThemedText>
          <ThemedText style={[styles.date, { color: secondaryTextColor }]} numberOfLines={1}>
            {date}
          </ThemedText>
        </View>
        
        <ThemedText style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
        
        <ThemedText style={[styles.description, { color: secondaryTextColor }]} numberOfLines={2}>
          {description}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrapper: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  imageContainer: {
    width: "100%",
    height: 163,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 12,
    gap: 8,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  author: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  date: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    opacity: 0.62,
  },
  title: {
    fontSize: FontSizes.md + 2,
    fontWeight: FontWeights.semibold,
    letterSpacing: -0.425,
    lineHeight: 23,
  },
  description: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.normal,
    letterSpacing: -0.065,
    lineHeight: 19.5,
    opacity: 0.62,
  },
});

