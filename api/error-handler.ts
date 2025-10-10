import { AxiosError } from "axios";
import { ApiError } from "./types";

export class ApiException extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number = 500, details?: any) {
    super(message);
    this.name = "ApiException";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): ApiException => {
  if (error instanceof ApiException) {
    return error;
  }

  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiError>;
    
    // Network error
    if (!axiosError.response) {
      return new ApiException(
        "Network error. Please check your connection.",
        0
      );
    }

    // Server responded with error
    const { status, data } = axiosError.response;
    const message = data?.message || data?.error || axiosError.message || "An error occurred";

    return new ApiException(message, status, data?.details);
  }

  // Unknown error
  if (error instanceof Error) {
    return new ApiException(error.message);
  }

  return new ApiException("An unexpected error occurred");
};

// User-friendly error messages
export const getErrorMessage = (error: ApiException): string => {
  switch (error.statusCode) {
    case 400:
      return error.message || "Invalid request. Please check your input.";
    case 401:
      return "Session expired. Please login again.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return error.message || "A conflict occurred. This resource may already exist.";
    case 422:
      return error.message || "Validation error. Please check your input.";
    case 429:
      return "Too many requests. Please try again later.";
    case 500:
      return "Server error. Please try again later.";
    case 503:
      return "Service temporarily unavailable. Please try again later.";
    case 0:
      return error.message; // Network error message
    default:
      return error.message || "An unexpected error occurred.";
  }
};

