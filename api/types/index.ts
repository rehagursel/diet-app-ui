// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Error response
export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
  details?: any;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms?: boolean;
  profileImage?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

// Token types
export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

