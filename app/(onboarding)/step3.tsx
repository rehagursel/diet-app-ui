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

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "extremely_active";

const activityLevels: {
  id: ActivityLevel;
  title: string;
  imageUrl: string;
}[] = [
  {
    id: "sedentary",
    title: "Sedentary (Little to no exercise)",
    imageUrl: "https://www.figma.com/api/mcp/asset/2675a89d-7459-49fe-b932-6390d94c2379",
  },
  {
    id: "light",
    title: "Lightly Active (Light exercise 1-3 days/week)",
    imageUrl: "https://www.figma.com/api/mcp/asset/61b63bad-a935-42aa-9b81-ae9a4e0a0bac",
  },
  {
    id: "moderate",
    title: "Moderately Active (Moderate exercise 3-5 days/week)",
    imageUrl: "https://www.figma.com/api/mcp/asset/8e5ed798-7fad-4fc0-b557-52ec2ce385c4",
  },
  {
    id: "active",
    title: "Very Active (Hard exercise 6-7 days/week)",
    imageUrl: "https://www.figma.com/api/mcp/asset/3e636ab6-e0c0-45c6-b0ab-7ad1cef42019",
  },
  {
    id: "extremely_active",
    title: "Extremely Active (Very hard exercise, physical job)",
    imageUrl: "https://www.figma.com/api/mcp/asset/6ec5576c-6a9d-4f56-9e3f-9661a782f71f",
  },
];

const Step3Screen = () => {
  const [selectedLevel, setSelectedLevel] = useState<ActivityLevel | null>(null);

  const backgroundColor = useThemeColor({}, "background");
  const primary = useThemeColor({}, "primary");
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const cardBackground = useThemeColor({}, "cardBackground");
  const textDisabled = useThemeColor({}, "textDisabled");

  const handleContinue = () => {
    if (!selectedLevel) {
      Alert.alert("Please select an activity level");
      return;
    }
    router.push("/(onboarding)/step4");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <Text type="subtitle" style={styles.progressText}>
            Step 3 of 5
          </Text>
        </View>

        <View style={styles.mainContent}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text type="title" style={styles.title}>
              How would you describe your daily activity level?
            </Text>
            <Text type="subtitle" style={[styles.titleSubtitle, { color: textSecondary }]}>
              This helps us create the perfect diet plan for your lifestyle
            </Text>
          </View>

          {/* Activity Levels List - Scrollable */}
          <ScrollView
            style={styles.levelsScrollView}
            contentContainerStyle={styles.levelsScrollContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.levelsContainer}>
              {activityLevels.map((level, index) => (
                <View key={level.id}>
                  <TouchableOpacity
                    style={[
                      styles.levelRow,
                      { backgroundColor: cardBackground },
                    ]}
                    onPress={() => setSelectedLevel(level.id)}
                    activeOpacity={0.7}
                  >
                    {/* Image Circle */}
                    <View style={styles.imageCircle}>
                      <Image
                        source={{ uri: level.imageUrl }}
                        style={styles.levelImage}
                        resizeMode="cover"
                      />
                    </View>

                    {/* Title */}
                    <View style={styles.levelTitleContainer}>
                      <Text
                        type="sectionHeader"
                        style={[
                          styles.levelListTitle,
                          {
                            color:
                              selectedLevel === level.id
                                ? text
                                : textDisabled,
                          },
                        ]}
                      >
                        {level.title}
                      </Text>
                    </View>

                    {/* Radio Button */}
                    <View
                      style={[
                        styles.radioButton,
                        { borderColor: border },
                        selectedLevel === level.id && {
                          backgroundColor: primary,
                          borderColor: primary,
                        },
                      ]}
                    >
                      {selectedLevel === level.id && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Divider */}
                  {index < activityLevels.length - 1 && (
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
  levelsScrollView: {
    flex: 1,
    marginTop: Layout.spacing.md,
  },
  levelsScrollContent: {
    paddingBottom: 100,
  },
  levelsContainer: {
    paddingHorizontal: 18,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 8,
    minHeight: 96,
  },
  imageCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 8,
  },
  levelImage: {
    width: 70,
    height: 70,
  },
  levelTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  levelListTitle: {
    letterSpacing: -0.36,
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

export default Step3Screen;

