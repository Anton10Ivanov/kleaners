
/**
 * Utility functions for standardized error handling across the application
 */

import { toast } from "sonner";
import { logger } from "./logging";

// Error types for better categorization
export type ErrorType = 
  | "auth" 
  | "database" 
  | "network" 
  | "validation" 
  | "api"
  | "timeout"
  | "permission"
  | "notFound"
  | "rateLimit"
  | "unknown";

export interface AppError extends Error {
  type: ErrorType;
  context?: Record<string, unknown>;
  code?: string;
  httpStatus?: number;
  retry?: boolean;
  component?: string;
}

// Error codes for specific error scenarios
export const ErrorCodes = {
  AUTH: {
    INVALID_CREDENTIALS: 'auth/invalid-credentials',
    SESSION_EXPIRED: 'auth/session-expired',
    UNAUTHORIZED: 'auth/unauthorized',
    MISSING_TOKEN: 'auth/missing-token',
  },
  DATABASE: {
    CONNECTION_FAILED: 'db/connection-failed',
    QUERY_FAILED: 'db/query-failed',
    WRITE_FAILED: 'db/write-failed',
    READ_FAILED: 'db/read-failed',
    TRANSACTION_FAILED: 'db/transaction-failed',
  },
  NETWORK: {
    CONNECTION_LOST: 'network/connection-lost',
    REQUEST_TIMEOUT: 'network/request-timeout',
    OFFLINE: 'network/offline',
  },
  API: {
    RATE_LIMITED: 'api/rate-limited',
    SERVER_ERROR: 'api/server-error',
    BAD_REQUEST: 'api/bad-request',
    NOT_FOUND: 'api/not-found',
  }
};

/**
 * Creates a typed application error with consistent structure
 */
export function createAppError(
  message: string, 
  type: ErrorType = "unknown", 
  originalError?: unknown,
  context?: Record<string, unknown>,
  code?: string,
  httpStatus?: number,
  retry: boolean = false,
  component?: string
): AppError {
  const error = new Error(message) as AppError;
  error.type = type;
  error.cause = originalError;
  error.context = context;
  error.code = code;
  error.httpStatus = httpStatus;
  error.retry = retry;
  error.component = component;
  
  // Log the error with additional context
  logger.error(`Error created: ${message}`, {
    errorType: type,
    originalError,
    context,
    code,
    httpStatus,
    retry,
    component,
    stack: error.stack,
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
  silent = false,
  retry?: () => void
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
  logger.error("[ERROR_HANDLER]", {
    message: appError.message,
    type: appError.type,
    cause: appError.cause,
    context: appError.context,
    code: appError.code,
    httpStatus: appError.httpStatus,
    component: appError.component,
    stack: appError.stack,
  });

  // Don't show toast if silent mode is requested
  if (!silent) {
    if (retry && appError.retry) {
      // Show toast with retry option
      toast.error(userMessage, {
        description: getPublicErrorMessage(appError),
        duration: 8000,
        action: {
          label: "Retry",
          onClick: retry,
        },
      });
    } else {
      // Show toast without retry option
      toast.error(userMessage, {
        description: getPublicErrorMessage(appError),
        duration: 5000,
      });
    }
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
 * Gets a user-friendly error message based on error type and code
 */
function getPublicErrorMessage(error: AppError): string {
  // First check specific error codes
  if (error.code) {
    switch (error.code) {
      case ErrorCodes.AUTH.INVALID_CREDENTIALS:
        return "Invalid username or password. Please try again.";
      case ErrorCodes.AUTH.SESSION_EXPIRED:
        return "Your session has expired. Please log in again.";
      case ErrorCodes.NETWORK.OFFLINE:
        return "You appear to be offline. Please check your internet connection.";
      case ErrorCodes.API.RATE_LIMITED:
        return "Too many requests. Please try again in a moment.";
      // Add more specific code-based messages as needed
    }
  }

  // Fall back to type-based messages
  switch (error.type) {
    case "auth":
      return "There was a problem with authentication. Please try logging in again.";
    case "database":
      return "We couldn't retrieve your data. Please try again later.";
    case "network":
      return "Network connection problem. Please check your internet connection.";
    case "validation":
      return error.message; // Validation errors are usually safe to show directly
    case "api":
      return "We're having trouble communicating with our servers. Please try again later.";
    case "timeout":
      return "The operation timed out. Please try again.";
    case "permission":
      return "You don't have permission to perform this action.";
    case "notFound":
      return "The requested resource was not found.";
    case "rateLimit":
      return "You've made too many requests. Please try again later.";
    default:
      return "Something went wrong. Our team has been notified.";
  }
}

/**
 * Utility for handling API errors with specific HTTP status codes
 */
export function handleApiError(
  error: unknown, 
  defaultMessage = "API request failed"
): AppError {
  // Handle Fetch API errors
  if (error instanceof Response || (error && typeof error === 'object' && 'status' in error)) {
    const response = error as Response;
    const statusCode = response.status;
    
    let errorType: ErrorType = "api";
    let errorCode: string | undefined = undefined;
    
    // Map HTTP status codes to error types
    if (statusCode >= 400 && statusCode < 500) {
      if (statusCode === 401 || statusCode === 403) {
        errorType = "auth";
        errorCode = statusCode === 401 ? ErrorCodes.AUTH.UNAUTHORIZED : ErrorCodes.AUTH.MISSING_TOKEN;
      } else if (statusCode === 404) {
        errorType = "notFound";
        errorCode = ErrorCodes.API.NOT_FOUND;
      } else if (statusCode === 429) {
        errorType = "rateLimit";
        errorCode = ErrorCodes.API.RATE_LIMITED;
      } else {
        errorCode = ErrorCodes.API.BAD_REQUEST;
      }
    } else if (statusCode >= 500) {
      errorCode = ErrorCodes.API.SERVER_ERROR;
    }
    
    return createAppError(
      `API Error: ${statusCode}`,
      errorType,
      error,
      { statusCode, url: response.url },
      errorCode,
      statusCode,
      statusCode === 429 || (statusCode >= 500 && statusCode < 600) // Retry on rate limit or server errors
    );
  }
  
  // Handle network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return createAppError(
      "Network Error",
      "network",
      error,
      undefined,
      ErrorCodes.NETWORK.CONNECTION_LOST,
      undefined,
      true // Network errors are usually retryable
    );
  }
  
  // Handle timeout errors
  if (error instanceof Error && error.name === "AbortError") {
    return createAppError(
      "Request Timeout",
      "timeout",
      error,
      undefined,
      ErrorCodes.NETWORK.REQUEST_TIMEOUT,
      undefined,
      true // Timeout errors are usually retryable
    );
  }
  
  // Handle other errors
  if (error instanceof Error) {
    return createAppError(
      error.message,
      "unknown",
      error,
      undefined,
      undefined,
      undefined,
      false
    );
  }
  
  // Handle non-Error objects
  return createAppError(
    defaultMessage,
    "unknown",
    error,
    { rawError: error },
    undefined,
    undefined,
    false
  );
}

/**
 * Creates a timeout promise that rejects after the specified duration
 */
export function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(createAppError(
        `Operation timed out after ${ms}ms`,
        "timeout",
        undefined,
        { timeoutMs: ms },
        ErrorCodes.NETWORK.REQUEST_TIMEOUT
      ));
    }, ms);
  });
}

/**
 * Wraps a promise with a timeout
 */
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    createTimeout(ms)
  ]);
}

/**
 * Retries a function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
    retryCondition?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 300,
    maxDelay = 5000,
    backoffFactor = 2,
    retryCondition = () => true
  } = options;
  
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries || !retryCondition(error)) {
        throw error;
      }
      
      const delay = Math.min(
        initialDelay * Math.pow(backoffFactor, attempt),
        maxDelay
      );
      
      logger.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
        error,
        attempt,
        delay
      });
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never happen due to the throw in the loop,
  // but TypeScript doesn't know that
  throw lastError;
}
