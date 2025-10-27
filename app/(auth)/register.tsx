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
  AuthLayout,
} from "@/components";
import { authCommonStyles } from "@/styles/auth-styles";
import {
  BorderRadius,
  FontSizes,
  FontWeights,
  Layout,
} from "@/constants/theme";
import { authService, userService, ApiException, getErrorMessage } from "@/api";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/features/authSlice";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const profileBg = useThemeColor({}, "profileBg");
  const border = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");
  const primary = useThemeColor({}, "primary");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
    if (
      !name.trim() ||
      !surname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
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
      Alert.alert(
        "Error",
        "Please agree to the Terms of Service and Privacy Policy"
      );
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

      dispatch(loginSuccess({ user: result.user, token: result.token }));

      // Upload profile image if selected
      if (profileImage) {
        try {
          await userService.uploadProfileImage(profileImage);
        } catch (uploadError) {
          console.error("Profile image upload failed:", uploadError);
          // Continue even if image upload fails
        }
      }

      router.replace("/(onboarding)/step1");
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
        <Text type="title" style={styles.headerTitle}>
          Create Your Account
        </Text>
        <Text type="subtitle">Join us for a healthier you!</Text>
      </View>

      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={[
            styles.logoPlaceholder,
            { backgroundColor: profileBg, borderColor: border },
          ]}
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
              <View
                style={[
                  styles.cameraIconBadge,
                  { backgroundColor: textSecondary, borderColor: profileBg },
                ]}
              >
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
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
          </View>
          <View style={styles.halfInputWrapper}>
            <TextInput
              placeholder="Surname"
              value={surname}
              onChangeText={setSurname}
              editable={!loading}
            />
          </View>
        </View>

        <TextInput
          style={authCommonStyles.input}
          placeholder="Email"
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
          secureTextEntry
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TextInput
          style={authCommonStyles.input}
          placeholder="Confirm Password"
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
            <View
              style={[
                styles.checkbox,
                { borderColor: border },
                agreedToTerms && {
                  backgroundColor: primary,
                  borderColor: primary,
                },
              ]}
            >
              {agreedToTerms && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
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
        <Text style={styles.loginLinkText}>Already have an account?</Text>
        <Text style={styles.loginLinkBold}>Log In</Text>
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
    marginBottom: Layout.spacing.xxs,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xxl,
  },
  logoPlaceholder: {
    width: 215,
    height: 215,
    borderRadius: BorderRadius.circle,
    borderWidth: 2,
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
    borderRadius: BorderRadius.xl,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },
  imageHintText: {
    marginTop: Layout.spacing.base,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  formContainer: {
    marginTop: Layout.spacing.xxxl,
    width: "100%",
  },
  formTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.semibold,
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
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  termsText: {
    fontSize: FontSizes.sm,
    flex: 1,
  },
  loginLinkContainer: {
    marginTop: Layout.spacing.xxl,
    paddingVertical: Layout.spacing.base,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Layout.spacing.xs,
  },
  loginLinkText: {
    fontSize: FontSizes.base,
  },
  loginLinkBold: {
    fontWeight: FontWeights.extrabold,
  },
});

export default RegisterScreen;
