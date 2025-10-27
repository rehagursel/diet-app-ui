import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { 
  ThemedText as Text, 
  TextInput, 
  ThemedButton, 
  SocialLoginButtons, 
  Separator,
  AuthLayout 
} from "@/components";
import { authCommonStyles } from "@/styles/auth-styles";
import { FontSizes, FontWeights, Layout } from "@/constants/theme";
import { authService, ApiException, getErrorMessage } from "@/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/features/authSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await authService.login({
        email: email.trim(),
        password,
      });

      dispatch(loginSuccess({ user: result.user, token: result.token }));
      /* router.replace("/(tabs)"); */
      router.replace("/(onboarding)/step1");

    } catch (error) {
      if (error instanceof ApiException) {
        Alert.alert("Login Failed", getErrorMessage(error));
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout scrollContentStyle={styles.scrollContent}>
      <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text type="title">Welcome</Text>
          <Text type="subtitle">Sign in to your account</Text>
        </View>

        <View style={styles.form}>
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
        </View>

        <ThemedButton 
          type="primary" 
          title={loading ? "Signing In..." : "Sign In"}
          style={authCommonStyles.button}
          onPress={handleLogin}
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

        <Separator />

        <View style={authCommonStyles.socialLoginContainer}>
          <SocialLoginButtons buttonStyle={authCommonStyles.button} />
        </View>

        <View style={styles.bottomLinksContainer}>
          <ThemedButton onPress={() => router.push("/(auth)/register" as any)}>
            <Text style={styles.registerLink}>Register now</Text>
          </ThemedButton>
          <Text style={styles.linkSeparator}>|</Text>
          <ThemedButton>
            <Text style={styles.forgotLink}>Forgot password?</Text>
          </ThemedButton>
        </View>

      <View style={authCommonStyles.bottomSpacer} />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: "center",
  },
  logoContainer: {
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.md,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  titleContainer: {
    width: "100%",
    marginBottom: Layout.spacing.lg,
    textAlign: "left",
  },
  form: {
    width: "100%",
    marginBottom: Layout.spacing.xl,
  },
  bottomLinksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Layout.spacing.xxxl,
    gap: Layout.spacing.base,
  },
  registerLink: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.extrabold,
  },
  linkSeparator: {
    fontSize: FontSizes.base,
  },
  forgotLink: {
    fontSize: FontSizes.base,
  },
});

export default LoginScreen;
