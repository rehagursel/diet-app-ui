import React from "react";
import { View, StyleSheet, ScrollView, ImageSourcePropType } from "react-native";
import { DailySummaryCard } from "./daily-summary-card";

export interface DailySummaryItem {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

interface DailySummaryCarouselProps {
  items: DailySummaryItem[];
}

export const DailySummaryCarousel = ({ items }: DailySummaryCarouselProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={173 + 8} // card width + gap
        snapToAlignment="start"
      >
        {items.map((item) => (
          <DailySummaryCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 18,
    gap: 8,
  },
});

