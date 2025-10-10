import apiClient from "../client";
import { User, ApiResponse } from "../types";
import { userStorage } from "../storage";

class UserService {
  // Get user profile
  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>("/users/profile");
      
      if (response.success && response.data) {
        await userStorage.setUser(response.data);
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch profile");
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<User>("/users/profile", data);
      
      if (response.success && response.data) {
        await userStorage.setUser(response.data);
        return response.data;
      }

      throw new Error(response.message || "Failed to update profile");
    } catch (error) {
      throw error;
    }
  }

  // Upload profile image
  async uploadProfileImage(imageUri: string): Promise<string> {
    try {
      const formData = new FormData();
      
      // Create file object from URI
      const filename = imageUri.split("/").pop() || "profile.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";
      
      formData.append("profileImage", {
        uri: imageUri,
        name: filename,
        type,
      } as any);

      const response = await apiClient.upload<{ url: string }>(
        "/users/profile/image",
        formData
      );

      if (response.success && response.data) {
        return response.data.url;
      }

      throw new Error(response.message || "Failed to upload image");
    } catch (error) {
      throw error;
    }
  }

  // Delete user account
  async deleteAccount(): Promise<void> {
    try {
      await apiClient.delete("/users/account");
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const userService = new UserService();
export default userService;
