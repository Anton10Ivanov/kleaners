
/**
 * Utility functions for standardized error handling across the application
 */

import { toast } from "sonner";

// Error types for better categorization
export type ErrorType = 
  | "auth" 
  | "database" 
  | "network" 
  | "validation" 
  | "unknown";

export interface AppError extends Error {
  type: ErrorType;
  context?: Record<string, unknown>;
}

/**
 * Creates a typed application error with consistent structure
 */
export function createAppError(
  message: string, 
  type: ErrorType = "unknown", 
  originalError?: unknown,
  context?: Record<string, unknown>
): AppError {
  const error = new Error(message) as AppError;
  error.type = type;
  error.cause = originalError;
  error.context = context;
  
  // Log the error to console with additional context
  console.error(`[${type.toUpperCase()}] ${message}`, {
    originalError,
    context,
    timestamp: new Date().toISOString(),
  });
  
  return error;
}

/**
 * Handles errors in a consistent way across the application
 * - Logs error details
 * - Shows user-friendly toast messages
 * - Optionally reports to monitoring service
 */
export function handleError(
  error: unknown, 
  userMessage = "An unexpected error occurred", 
  silent = false
): void {
  // Get or create a properly typed error
  const appError = isAppError(error) 
    ? error 
    : createAppError(
        error instanceof Error ? error.message : String(error),
        "unknown",
        error
      );

  // Log the error with contextual information
  console.error("[ERROR]", {
    message: appError.message,
    type: appError.type,
    cause: appError.cause,
    context: appError.context,
    stack: appError.stack,
  });

  // Don't show toast if silent mode is requested
  if (!silent) {
    toast.error(userMessage, {
      description: getPublicErrorMessage(appError),
      duration: 5000,
    });
  }

  // Here you could add error reporting to a service like Sentry
  // reportErrorToMonitoringService(appError);
}

/**
 * Type guard to check if an error is an AppError
 */
function isAppError(error: unknown): error is AppError {
  return (
    error instanceof Error && 
    'type' in error
  );
}

/**
 * Gets a user-friendly error message based on error type
 */
function getPublicErrorMessage(error: AppError): string {
  switch (error.type) {
    case "auth":
      return "There was a problem with authentication. Please try logging in again.";
    case "database":
      return "We couldn't retrieve your data. Please try again later.";
    case "network":
      return "Network connection problem. Please check your internet connection.";
    case "validation":
      return error.message; // Validation errors are usually safe to show directly
    default:
      return "Something went wrong. Our team has been notified.";
  }
}
