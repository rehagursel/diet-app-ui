import apiClient from "../client";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "../types";
import { clearStorage } from "../storage";

class AuthService {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (response.success && response.data) {
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
      // Sunucu taraflı logout işlemi (token invalidation vb.)
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Yerel depolamayı temizle
      await clearStorage();
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>("/auth/me");
      
      if (response.success && response.data) {
        return response.data;
      }

      return null;
    } catch (error) {
      console.error("Get current user failed:", error);
      return null;
    }
  }

  // Refresh token
  async refreshToken(): Promise<{ token: string; refreshToken?: string } | null> {
    // Bu fonksiyonun, interceptor'da kullanılabilmesi için
    // store'dan refresh token alacak şekilde yeniden düzenlenmesi gerekebilir.
    // Şimdilik temel yapıyı koruyoruz.
    try {
      const response = await apiClient.post<{ token: string; refreshToken?: string }>(
        "/auth/refresh",
        {} // Normalde refresh token body'de gönderilir.
      );

      if (response.success && response.data) {
        return response.data;
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
