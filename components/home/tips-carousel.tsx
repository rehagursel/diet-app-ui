import React from "react";
import { View, StyleSheet, ScrollView, ImageSourcePropType } from "react-native";
import { TipCard } from "./tip-card";

export interface TipItem {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

interface TipsCarouselProps {
  tips: TipItem[];
}

export const TipsCarousel = ({ tips }: TipsCarouselProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={340 + 12} // card width + gap
        snapToAlignment="start"
      >
        {tips.map((tip) => (
          <TipCard
            key={tip.id}
            title={tip.title}
            description={tip.description}
            author={tip.author}
            date={tip.date}
            image={tip.image}
            onPress={tip.onPress}
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
    gap: 12,
  },
});

