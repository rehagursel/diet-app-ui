import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
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
  FontFamilies,
} from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

const Step1Screen = () => {
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const backgroundColor = useThemeColor({}, "background");
  const primary = useThemeColor({}, "primary");
  const border = useThemeColor({}, "border");
  const text = useThemeColor({}, "text");
  const placeholder = useThemeColor({}, "placeholder");
  const cardBackground = useThemeColor({}, "cardBackground");

  const handleContinue = () => {
    // Validation
    if (!gender || !age || !height || !weight) {
      Alert.alert("Please fill in all fields");
      return;
    }

    // Store data in a temporary state or context
    // For now, just navigate to next step
    router.push("/(onboarding)/step2");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Progress Header */}
        <View style={styles.progressHeader}>
          <Text type="subtitle" style={styles.progressText}>
            Step 1 of 5
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text type="title" style={styles.title}>
              Tell Us About Yourself
            </Text>
          </View>

          {/* Age Field */}
          <View style={styles.fieldContainer}>
            <Text type="sectionHeader" style={styles.label}>Age</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                maxLength={3}
                style={[styles.textInput, { color: text }]}
                placeholderTextColor={placeholder}
              />
            </View>
          </View>

          {/* Gender Field */}
          <View style={styles.fieldContainer}>
            <Text type="sectionHeader" style={styles.label}>Gender</Text>
            <View style={styles.genderCardsContainer}>
              <TouchableOpacity
                style={[
                  styles.genderCard,
                  { backgroundColor: cardBackground, borderColor: border },
                  gender === "Male" && {
                    borderColor: primary,
                    borderWidth: 2,
                    backgroundColor: `${primary}15`,
                  },
                ]}
                onPress={() => setGender("Male")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="male"
                  size={32}
                  color={gender === "Male" ? primary : text}
                />
                <Text type="default" style={[styles.genderLabel, { color: text }]}>
                  Male
                </Text>
                {gender === "Male" && (
                  <View style={[styles.checkmark, { backgroundColor: primary }]}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderCard,
                  { backgroundColor: cardBackground, borderColor: border },
                  gender === "Female" && {
                    borderColor: primary,
                    borderWidth: 2,
                    backgroundColor: `${primary}15`,
                  },
                ]}
                onPress={() => setGender("Female")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="female"
                  size={32}
                  color={gender === "Female" ? primary : text}
                />
                <Text type="default" style={[styles.genderLabel, { color: text }]}>
                  Female
                </Text>
                {gender === "Female" && (
                  <View style={[styles.checkmark, { backgroundColor: primary }]}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderCard,
                  { backgroundColor: cardBackground, borderColor: border },
                  gender === "Other" && {
                    borderColor: primary,
                    borderWidth: 2,
                    backgroundColor: `${primary}15`,
                  },
                ]}
                onPress={() => setGender("Other")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="male-female"
                  size={32}
                  color={gender === "Other" ? primary : text}
                />
                <Text type="default" style={[styles.genderLabel, { color: text }]}>
                  Other
                </Text>
                {gender === "Other" && (
                  <View style={[styles.checkmark, { backgroundColor: primary }]}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Height Field */}
          <View style={styles.fieldContainer}>
            <Text type="sectionHeader" style={styles.label}>Current Height</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your height"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                maxLength={3}
                style={[styles.textInput, { color: text }]}
                placeholderTextColor={placeholder}
              />
            </View>
          </View>

          {/* Weight Field */}
          <View style={styles.fieldContainer}>
            <Text type="sectionHeader" style={styles.label}>Current Weight</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                maxLength={3}
                style={[styles.textInput, { color: text }]}
                placeholderTextColor={placeholder}
              />
            </View>
          </View>

          {/* Next Button */}
          <View style={styles.buttonContainer}>
            <ThemedButton
              type="primary"
              title="Next"
              onPress={handleContinue}
              style={styles.nextButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  progressHeader: {
    alignItems: "center",
    paddingVertical: Layout.spacing.md,
  },
  progressText: {
    letterSpacing: -0.34,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxxl,
  },
  titleContainer: {
    paddingHorizontal: Layout.padding.horizontal,
    paddingTop: Layout.spacing.xxl,
    paddingBottom: 4,
  },
  title: {
    letterSpacing: -0.56,
  },
  fieldContainer: {
    paddingTop: Layout.spacing.xxl,
  },
  label: {
    letterSpacing: -0.36,
    paddingHorizontal: Layout.padding.horizontal,
    paddingBottom: 2,
  },
  inputContainer: {
    paddingHorizontal: Layout.padding.horizontal,
    paddingVertical: Layout.spacing.sm,
  },
  textInput: {
    backgroundColor: "rgba(37, 126, 79, 0.09)",
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 13,
    paddingVertical: 13.5,
    fontFamily: FontFamilies.regular,
    fontSize: FontSizes.xl,
    lineHeight: 23,
  },
  genderCardsContainer: {
    flexDirection: "row",
    gap: Layout.spacing.md,
    paddingHorizontal: Layout.padding.horizontal,
    paddingTop: Layout.spacing.sm,
  },
  genderCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    paddingVertical: Layout.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    minHeight: 100,
  },
  genderLabel: {
    marginTop: Layout.spacing.sm,
    fontWeight: FontWeights.medium,
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    paddingHorizontal: Layout.padding.horizontal,
    paddingTop: Layout.spacing.lg,
  },
  nextButton: {
    height: 50,
  },
});

export default Step1Screen;

