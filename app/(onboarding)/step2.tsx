import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  ThemedText as Text,
  ThemedButton,
} from "@/components";
import {
  BorderRadius,
  FontSizes,
  FontWeights,
  Layout,
} from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type Goal = "lose" | "gain" | "maintain" | "prevent-disease" | "healthy";

const goals: { id: Goal; title: string; subtitle: string; imageUrl: string }[] = [
  {
    id: "lose",
    title: "Lose Weight",
    subtitle: "Achieve your ideal weight in a healthy way",
    imageUrl: "https://www.figma.com/api/mcp/asset/bd10172c-a413-409e-8f1c-b8b83f60647e",
  },
  {
    id: "gain",
    title: "Gain Muscle",
    subtitle: "Build muscle mass and increase strength",
    imageUrl: "https://www.figma.com/api/mcp/asset/3652e11b-70ac-4c0c-9043-6344a0b52bfc",
  },
  {
    id: "maintain",
    title: "Maintain Weight",
    subtitle: "Keep your current weight stable",
    imageUrl: "https://www.figma.com/api/mcp/asset/ab768c8e-10ff-4464-b4a8-b2d6f08b53f8",
  },
  {
    id: "prevent-disease",
    title: "Prevent Disease",
    subtitle: "Prevent diseases and improve your health",
    imageUrl: "https://www.figma.com/api/mcp/asset/1348b4ec-7253-499e-9540-0f8e9e687343",
  },
  {
    id: "healthy",
    title: "Eat Healthier",
    subtitle: "Improve your nutrition and eating habits",
    imageUrl: "https://www.figma.com/api/mcp/asset/1348b4ec-7253-499e-9540-0f8e9e687343",
  },
];

const Step2Screen = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const backgroundColor = useThemeColor({}, "background");
  const primary = useThemeColor({}, "primary");
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textDisabled = useThemeColor({}, "textDisabled");

  const handleContinue = () => {
    if (!selectedGoal) {
      Alert.alert("Please select a goal");
      return;
    }
    router.push("/(onboarding)/step3");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <Text type="subtitle" style={styles.progressText}>
            Step 2 of 5
          </Text>
        </View>

        <View style={styles.mainContent}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text type="title" style={styles.title}>
              What's Your Main Goal?
            </Text>
            <Text type="subtitle" style={[styles.titleSubtitle, { color: textSecondary }]}>
              We'll calculate your daily calorie needs and nutritional values based on your selected goal
            </Text>
          </View>

          {/* Goals List - Scrollable */}
          <ScrollView 
            style={styles.goalsScrollView}
            contentContainerStyle={styles.goalsScrollContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.goalsContainer}>
            {goals.map((goal, index) => (
              <View key={goal.id}>
                <TouchableOpacity
                  style={[
                    styles.goalRow,
                    { backgroundColor: cardBackground },
                  ]}
                  onPress={() => setSelectedGoal(goal.id)}
                  activeOpacity={0.7}
                >
                  {/* Image Circle */}
                  <View style={styles.imageCircle}>
                    <Image
                      source={{ uri: goal.imageUrl }}
                      style={styles.goalImage}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Title & Subtitle */}
                  <View style={styles.goalTitleContainer}>
                    <Text
                      type="sectionHeader"
                      style={[
                        styles.goalListTitle,
                        {
                          color:
                            selectedGoal === goal.id
                              ? text
                              : textDisabled,
                        },
                      ]}
                    >
                      {goal.title}
                    </Text>
                    <Text
                      type="default"
                      style={[
                        styles.goalListSubtitle,
                        { color: textSecondary },
                      ]}
                    >
                      {goal.subtitle}
                    </Text>
                  </View>

                  {/* Radio Button */}
                  <View
                    style={[
                      styles.radioButton,
                      { borderColor: border },
                      selectedGoal === goal.id && {
                        backgroundColor: primary,
                        borderColor: primary,
                      },
                    ]}
                  >
                    {selectedGoal === goal.id && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Divider */}
                {index < goals.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: border }]} />
                )}
              </View>
            ))}
            </View>
          </ScrollView>
        </View>

        {/* Continue Button */}
        <View style={[styles.footer, { backgroundColor }]}>
          <ThemedButton
            type="primary"
            title="Next"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  progressHeader: {
    alignItems: "center",
    paddingVertical: Layout.spacing.md,
  },
  progressText: {
    letterSpacing: -0.34,
  },
  mainContent: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 4,
  },
  title: {
    letterSpacing: -0.56,
    marginBottom: Layout.spacing.sm,
  },
  titleSubtitle: {
    lineHeight: 22,
  },
  goalsScrollView: {
    flex: 1,
    marginTop: Layout.spacing.md,
  },
  goalsScrollContent: {
    paddingBottom: 100,
  },
  goalsContainer: {
    paddingHorizontal: 18,
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 8,
    minHeight: 96,
  },
  imageCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 8,
  },
  goalImage: {
    width: 80,
    height: 80,
  },
  goalTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  goalListTitle: {
    letterSpacing: -0.36,
    marginBottom: 4,
  },
  goalListSubtitle: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 0.5,
    marginLeft: 96,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.padding.horizontal,
    paddingBottom: Layout.spacing.xxl,
    paddingTop: Layout.spacing.lg,
  },
  continueButton: {
    width: "100%",
    height: 50,
  },
});

export default Step2Screen;

