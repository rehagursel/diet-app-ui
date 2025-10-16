import React from "react";
import { View, StyleSheet, ScrollView, ImageSourcePropType } from "react-native";
import { MealCard } from "./meal-card";

export interface MealItem {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  onPress?: () => void;
  onAddPress?: () => void;
}

interface MealsCarouselProps {
  meals: MealItem[];
}

export const MealsCarousel = ({ meals }: MealsCarouselProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={173 + 10} // card width + gap
        snapToAlignment="start"
      >
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.title}
            subtitle={meal.subtitle}
            image={meal.image}
            onPress={meal.onPress}
            onAddPress={meal.onAddPress}
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
    paddingHorizontal: 20,
    gap: 10,
  },
});

