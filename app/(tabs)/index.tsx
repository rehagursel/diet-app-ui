import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import {
  HomeHeader,
  DailySummaryCarousel,
  QuickActionsCarousel,
  SectionHeader,
  MealsCarousel,
  WeeklyAtGlance,
  TipsCarousel,
  DailySummaryItem,
  QuickAction,
  MealItem,
  FeatureItem,
  TipItem,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/authSlice";
import { RootState } from "@/store";
import { authService } from "@/api";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await authService.logout();
            dispatch(logout());
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "Notifications feature coming soon!");
  };

  // Mock data - Replace with real data from API
  const dailySummaryItems: DailySummaryItem[] = [
    {
      id: "1",
      title: "Daily Calories",
      subtitle: "1200 / 1800 cal",
      image: require("@/assets/images/demo_meal.png"),
    },
    {
      id: "2",
      title: "Water Intake",
      subtitle: "6 / 8 glasses",
      image: require("@/assets/images/demo_meal.png"),
    },
    {
      id: "3",
      title: "Today's Activity",
      subtitle: "350 kcal burned",
      image: require("@/assets/images/demo_meal.png"),
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "1",
      label: "Take Photo",
      icon: "camera-outline",
      onPress: () => Alert.alert("Take Photo", "Camera feature coming soon!"),
    },
    {
      id: "2",
      label: "Add Meal Manually",
      icon: "add-circle-outline",
      onPress: () => Alert.alert("Add Meal", "Add meal feature coming soon!"),
    },
    {
      id: "3",
      label: "+ Add a Glass",
      icon: "water-outline",
      onPress: () => Alert.alert("Add Water", "Water tracking coming soon!"),
    },
    {
      id: "4",
      label: "+ Add Activity",
      icon: "fitness-outline",
      onPress: () => Alert.alert("Add Activity", "Activity tracking coming soon!"),
    },
  ];

  const todaysMeals: MealItem[] = [
    {
      id: "1",
      title: "Breakfast",
      subtitle: "Oatmeal, Berries",
      image: require("@/assets/images/demo_meal.png"),
      onPress: () => Alert.alert("Breakfast", "View meal details"),
      onAddPress: () => Alert.alert("Add to Breakfast", "Add more items"),
    },
    {
      id: "2",
      title: "Lunch",
      subtitle: "Grilled Chicken, Salad",
      image: require("@/assets/images/demo_meal.png"),
      onPress: () => Alert.alert("Lunch", "View meal details"),
      onAddPress: () => Alert.alert("Add to Lunch", "Add more items"),
    },
    {
      id: "3",
      title: "Dinner",
      subtitle: "Steak, Roasted Vegetables",
      image: require("@/assets/images/demo_meal.png"),
      onPress: () => Alert.alert("Dinner", "View meal details"),
      onAddPress: () => Alert.alert("Add to Dinner", "Add more items"),
    },
  ];

  const weeklyFeatures: FeatureItem[] = [
    {
      id: "1",
      title: "Weight Change",
      value: "-0.5kg",
      icon: "trending-down-outline",
      onPress: () => Alert.alert("Weight Change", "View weight history"),
    },
    {
      id: "2",
      title: "Your Rank",
      value: "#15",
      icon: "trophy-outline",
      onPress: () => Alert.alert("Your Rank", "View leaderboard"),
    },
    {
      id: "3",
      title: "Weekly Activity",
      value: "4 / 5 workouts",
      icon: "barbell-outline",
      onPress: () => Alert.alert("Weekly Activity", "View activity log"),
    },
    {
      id: "4",
      title: "Current Streak",
      value: "12 days",
      icon: "flame-outline",
      onPress: () => Alert.alert("Current Streak", "Keep it up!"),
    },
    {
      id: "5",
      title: "Weekly Diet Plan",
      value: "Dec 4-10, 2023",
      icon: "calendar-outline",
      onPress: () => Alert.alert("Diet Plan", "View your weekly plan"),
    },
  ];

  const tips: TipItem[] = [
    {
      id: "1",
      title: "Stay Hydrated",
      description: "Remember to drink water regularly.",
      author: "Health Guru",
      date: "Today",
      image: require("@/assets/images/demo_meal.png"),
      onPress: () => Alert.alert("Stay Hydrated", "Read more about hydration"),
    },
    {
      id: "2",
      title: "Balanced Diet",
      description: "Include all food groups in your meals.",
      author: "Nutritionist",
      date: "Today",
      image: require("@/assets/images/demo_meal.png"),
      onPress: () => Alert.alert("Balanced Diet", "Read more about balanced diet"),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <HomeHeader
        userName={user?.name ?? "Guest"}
        userEmail={user?.email}
        profileImage={user?.profileImage ? `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${user.profileImage}` : undefined}
        onNotificationPress={handleNotificationPress}
        onLogout={handleLogout}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Summary Carousel */}
        <View style={styles.section}>
          <DailySummaryCarousel items={dailySummaryItems} />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <QuickActionsCarousel actions={quickActions} />
        </View>

        {/* Today's Meals */}
        <View style={styles.section}>
          <SectionHeader
            title="Today's Meals"
            showSeeAll
            onSeeAllPress={() => Alert.alert("See All Meals", "Navigate to meals page")}
          />
          <MealsCarousel meals={todaysMeals} />
        </View>

        {/* Weekly At a Glance */}
        <View style={styles.section}>
          <SectionHeader title="Weekly At a Glance" />
          <WeeklyAtGlance features={weeklyFeatures} />
        </View>

        {/* Today's Tips */}
        <View style={styles.section}>
          <SectionHeader title="Today's Tips" />
          <TipsCarousel tips={tips} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 8,
  },
});

