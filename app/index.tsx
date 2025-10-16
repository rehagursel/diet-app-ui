import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { getAuthToken } from "@/api/storage";

/**
 * Root Index - Entry point of the app
 * Checks if user is authenticated and redirects accordingly
 */
const RootIndex = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getAuthToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#14AE5C" />
      </View>
    );
  }

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/(auth)/login"} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
  },
});

export default RootIndex;
