import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { 
  ThemedText as Text, 
  TextInput, 
  ThemedButton, 
  SocialLoginButtons, 
  Separator,
  AuthLayout 
} from "@/components";
import { authCommonStyles } from "@/styles/auth-styles";
import { AppColors, BorderRadius, FontSizes, FontWeights, Layout } from "@/constants/theme";
import { authService, userService, ApiException, getErrorMessage } from "@/api";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to grant permission to access your photos!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images" as any,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    // Validation
    if (!name.trim() || !surname.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      Alert.alert("Error", "Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);
    try {
      // Register user
      const result = await authService.register({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        agreedToTerms,
      });

      // Upload profile image if selected
      if (profileImage) {
        try {
          await userService.uploadProfileImage(profileImage);
        } catch (uploadError) {
          console.error("Profile image upload failed:", uploadError);
          // Continue even if image upload fails
        }
      }

      // Success
      Alert.alert(
        "Success!",
        `Welcome ${result.user.name}! Your account has been created successfully.`,
        [
          {
            text: "OK",
            onPress: () => {
              // TODO: Navigate to main app
              // router.replace("/(tabs)");
              console.log("Registration successful:", result.user);
            },
          },
        ]
      );
    } catch (error) {
      if (error instanceof ApiException) {
        Alert.alert("Registration Failed", getErrorMessage(error));
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.headerContainer}>
          <Text type="title" style={styles.headerTitle}>Create Your Account</Text>
          <Text type="subtitle" style={styles.headerSubtitle}>Join us for a healthier you!</Text>
        </View>

        <View style={styles.logoContainer}>
          <TouchableOpacity 
            style={styles.logoPlaceholder}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.defaultIconContainer}>
                <Ionicons name="person" size={80} color="#888" />
                <View style={styles.cameraIconBadge}>
                  <Ionicons name="camera" size={24} color="#fff" />
                </View>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.imageHintText}>Tap to add photo</Text>
        </View>

        <View style={styles.formContainer}>

          <View style={styles.dualInputContainer}>
            <View style={styles.halfInputWrapper}>
              <TextInput
                placeholder="Name"
                placeholderTextColor={AppColors.text.placeholder}
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>
            <View style={styles.halfInputWrapper}>
              <TextInput
                placeholder="Surname"
                placeholderTextColor={AppColors.text.placeholder}
                value={surname}
                onChangeText={setSurname}
                editable={!loading}
              />
            </View>
          </View>

          <TextInput
            style={authCommonStyles.input}
            placeholder="Email"
            placeholderTextColor={AppColors.text.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />

          <TextInput
            style={authCommonStyles.input}
            placeholder="Password"
            placeholderTextColor={AppColors.text.placeholder}
            secureTextEntry
            autoComplete="password"
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />

          <TextInput
            style={authCommonStyles.input}
            placeholder="Confirm Password"
            placeholderTextColor={AppColors.text.placeholder}
            secureTextEntry
            autoComplete="password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />

          <ThemedButton 
            type="primary" 
            title={loading ? "Creating Account..." : "Sign Up"}
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading && (
              <ActivityIndicator 
                color="#fff" 
                size="small" 
                style={{ marginLeft: 10 }} 
              />
            )}
          </ThemedButton>

          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            disabled={loading}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={styles.termsText}>
                I agree to the Terms of Service and Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Separator />

        <View style={authCommonStyles.socialLoginContainer}>
          <SocialLoginButtons buttonStyle={authCommonStyles.button} />
        </View>

        <TouchableOpacity 
          style={styles.loginLinkContainer}
          onPress={() => router.back()}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={styles.loginLinkBold}>Log In</Text>
          </Text>
        </TouchableOpacity>

      <View style={authCommonStyles.bottomSpacer} />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Layout.spacing.xxxl,
    marginBottom: Layout.spacing.xs,
  },
  headerTitle: {
    color: AppColors.text.primary,
    marginBottom: Layout.spacing.xxs,
  },
  headerSubtitle: {
    color: AppColors.text.subtitle,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xxl,
  },
  logoPlaceholder: {
    width: 215,
    height: 215,
    borderRadius: BorderRadius.circle,
    backgroundColor: AppColors.ui.profileBg,
    borderWidth: 2,
    borderColor: AppColors.ui.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: BorderRadius.circle,
  },
  defaultIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cameraIconBadge: {
    position: "absolute",
    bottom: -Layout.spacing.md,
    right: -Layout.spacing.md,
    backgroundColor: AppColors.text.secondary,
    borderRadius: BorderRadius.xl,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: AppColors.ui.profileBg,
  },
  imageHintText: {
    marginTop: Layout.spacing.base,
    fontSize: FontSizes.md,
    color: AppColors.text.placeholder,
    fontWeight: FontWeights.medium,
  },
  formContainer: {
    marginTop: Layout.spacing.xxxl,
    width: "100%",
  },
  formTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.primary,
    marginBottom: Layout.spacing.xxxl,
  },
  dualInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  halfInputWrapper: {
    flex: 1,
  },
  button: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
  },
  termsContainer: {
    paddingVertical: Layout.spacing.sm,
    alignItems: "center",
    marginBottom: Layout.spacing.lg,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: AppColors.ui.border,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  termsText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.placeholder,
    flex: 1,
  },
  loginLinkContainer: {
    marginTop: Layout.spacing.xxl,
    paddingVertical: Layout.spacing.base,
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: FontSizes.base,
    color: AppColors.text.placeholder,
  },
  loginLinkBold: {
    color: AppColors.text.secondary,
    fontWeight: FontWeights.extrabold,
  },
});

export default RegisterScreen;

