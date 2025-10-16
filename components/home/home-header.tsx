import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { FontSizes, FontWeights, Layout } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ProfileMenu } from "./profile-menu";

interface HomeHeaderProps {
  userName: string;
  userEmail?: string;
  profileImage?: string | null;
  onNotificationPress?: () => void;
  onLogout?: () => void;
}

export const HomeHeader = ({ 
  userName, 
  userEmail,
  profileImage, 
  onNotificationPress,
  onLogout,
}: HomeHeaderProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const [menuVisible, setMenuVisible] = useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <ThemedView safeAreaTop style={styles.container}>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={() => setMenuVisible(true)}
        activeOpacity={0.7}
      >
        {profileImage ? (
          <Image 
            source={{ uri: profileImage }} 
            style={styles.profileImage}
          />
        ) : (
          <View style={[styles.profileImagePlaceholder, { backgroundColor: primaryColor }]}>
            <ThemedText style={[styles.profileInitial, { color: "#fff" }]}>
              {userName.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.greetingContainer}>
        <ThemedText style={styles.greetingText}>
          {getGreeting()}, {userName}!
        </ThemedText>
      </View>

      <TouchableOpacity 
        style={styles.notificationButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={24} color={primaryColor} />
      </TouchableOpacity>

      <ProfileMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogout={handleLogout}
        onProfilePress={() => {
          // TODO: Navigate to profile page
        }}
        onSettingsPress={() => {
          // TODO: Navigate to settings page
        }}
        userName={userName}
        userEmail={userEmail}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileContainer: {
    marginRight: 12,
    padding: Layout.padding.screen,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  notificationButton: {
    padding: 8,
  },
});

