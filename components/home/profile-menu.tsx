import React from "react";
import { View, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { ThemedText } from "../themed-text";
import { FontSizes, FontWeights } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

interface ProfileMenuProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
  userName: string;
  userEmail?: string;
}

export const ProfileMenu = ({ 
  visible, 
  onClose, 
  onLogout,
  onProfilePress,
  onSettingsPress,
  userName,
  userEmail,
}: ProfileMenuProps) => {
  const backgroundColor = useThemeColor({}, "cardBackground");
  const textColor = useThemeColor({}, "text");
  const secondaryTextColor = useThemeColor({}, "textSecondary");
  const borderColor = useThemeColor({}, "border");
  const dangerColor = "#DC2626";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.menuContainer, { backgroundColor }]}>
          <View style={[styles.menuContent, { borderColor }]}>
            {/* User Info */}
            <View style={styles.userInfo}>
              <ThemedText style={styles.userName}>{userName}</ThemedText>
              {userEmail && (
                <ThemedText style={[styles.userEmail, { color: secondaryTextColor }]}>
                  {userEmail}
                </ThemedText>
              )}
            </View>

            {/* Menu Items */}
            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                if (onProfilePress) {
                  onProfilePress();
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="person-outline" size={20} color={textColor} />
              <ThemedText style={styles.menuItemText}>View Profile</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                if (onSettingsPress) {
                  onSettingsPress();
                }
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="settings-outline" size={20} color={textColor} />
              <ThemedText style={styles.menuItemText}>Settings</ThemedText>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                onLogout();
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={20} color={dangerColor} />
              <ThemedText style={[styles.menuItemText, { color: dangerColor }]}>
                Logout
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  menuContainer: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContent: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  userInfo: {
    padding: 16,
    paddingBottom: 12,
  },
  userName: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSizes.sm,
  },
  divider: {
    height: 1,
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
});

