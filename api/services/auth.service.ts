import apiClient from "../client";
import { tokenStorage, userStorage, clearStorage } from "../storage";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
  User,
} from "../types";

class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (response.success && response.data) {
        // Save token and user data
        await tokenStorage.setToken(response.data.token);
        if (response.data.refreshToken) {
          await tokenStorage.setRefreshToken(response.data.refreshToken);
        }
        await userStorage.setUser(response.data.user);

        return response.data;
      }

      throw new Error(response.message || "Login failed");
    } catch (error) {
      throw error;
    }
  }

  // Register
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        userData
      );

      if (response.success && response.data) {
        // Save token and user data
        await tokenStorage.setToken(response.data.token);
        if (response.data.refreshToken) {
          await tokenStorage.setRefreshToken(response.data.refreshToken);
        }
        await userStorage.setUser(response.data.user);

        return response.data;
      }

      throw new Error(response.message || "Registration failed");
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      await apiClient.post("/auth/logout");
    } catch (error) {
      // Continue with local logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      // Clear all local storage
      await clearStorage();
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>("/auth/me");
      
      if (response.success && response.data) {
        await userStorage.setUser(response.data);
        return response.data;
      }

      return null;
    } catch (error) {
      console.error("Get current user failed:", error);
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const token = await tokenStorage.getToken();
    return !!token;
  }

  // Refresh token
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      const response = await apiClient.post<{ token: string; refreshToken?: string }>(
        "/auth/refresh",
        { refreshToken }
      );

      if (response.success && response.data) {
        await tokenStorage.setToken(response.data.token);
        if (response.data.refreshToken) {
          await tokenStorage.setRefreshToken(response.data.refreshToken);
        }
        return response.data.token;
      }

      return null;
    } catch (error) {
      console.error("Refresh token failed:", error);
      await clearStorage();
      return null;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post("/auth/forgot-password", { email });
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post("/auth/reset-password", { token, password: newPassword });
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post("/auth/verify-email", { token });
    } catch (error) {
      throw error;
    }
  }

  // Resend verification email
  async resendVerificationEmail(): Promise<void> {
    try {
      await apiClient.post("/auth/resend-verification");
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
