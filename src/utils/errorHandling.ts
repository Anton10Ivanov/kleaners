
import { logger } from './logging';

// Define error types for better categorization
export enum ErrorType {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  NETWORK = 'network',
  SERVER = 'server',
  DATABASE = 'database',
  UNKNOWN = 'unknown'
}

// Define error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Custom error class with additional properties
export class AppError extends Error {
  type: ErrorType;
  severity: ErrorSeverity;
  code: string;
  originalError?: Error;
  httpStatus?: number;
  metadata?: Record<string, any>;

  constructor({
    message,
    type = ErrorType.UNKNOWN,
    severity = ErrorSeverity.MEDIUM,
    code = 'ERR_UNKNOWN',
    originalError,
    httpStatus,
    metadata
  }: {
    message: string;
    type?: ErrorType;
    severity?: ErrorSeverity;
    code?: string;
    originalError?: Error;
    httpStatus?: number;
    metadata?: Record<string, any>;
  }) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.code = code;
    this.originalError = originalError;
    this.httpStatus = httpStatus;
    this.metadata = metadata;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

// HTTP status code mapping for error types
const errorTypeToHttpStatus = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.AUTHENTICATION]: 401,
  [ErrorType.AUTHORIZATION]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.NETWORK]: 500,
  [ErrorType.SERVER]: 500,
  [ErrorType.DATABASE]: 500,
  [ErrorType.UNKNOWN]: 500
};

// Main error handling function
export function handleError(
  error: unknown,
  context: string,
  throwError = true,
  metadata?: Record<string, any>
): AppError {
  // Convert the error to AppError for consistent handling
  const appError = createAppError(error, context, metadata);
  
  // Log the error with appropriate severity
  switch (appError.severity) {
    case ErrorSeverity.LOW:
      logger.warn(appError.message, {
        error: appError,
        context,
        originalError: appError.originalError
      });
      break;
    case ErrorSeverity.MEDIUM:
      logger.error(appError.message, {
        error: appError,
        context,
        originalError: appError.originalError
      });
      break;
    case ErrorSeverity.HIGH:
    case ErrorSeverity.CRITICAL:
      logger.fatal(appError.message, {
        error: appError,
        context,
        originalError: appError.originalError
      });
      break;
  }

  // Rethrow the error if needed
  if (throwError) {
    throw appError;
  }

  return appError;
}

// Helper function to create an AppError from various error types
function createAppError(
  error: unknown,
  context: string,
  metadata?: Record<string, any>
): AppError {
  // If already an AppError, just add metadata if provided
  if (error instanceof AppError) {
    if (metadata) {
      error.metadata = { ...error.metadata, ...metadata };
    }
    return error;
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    // Try to determine error type from message or name
    let type = ErrorType.UNKNOWN;
    let severity = ErrorSeverity.MEDIUM;
    let httpStatus: number | undefined = undefined;
    
    // Check for network errors
    if (
      error.message.includes('network') || 
      error.message.includes('fetch') ||
      error.message.includes('timeout') ||
      error.message.includes('connection')
    ) {
      type = ErrorType.NETWORK;
    }
    
    // Check for not found errors
    else if (
      error.message.includes('not found') ||
      error.message.includes('404')
    ) {
      type = ErrorType.NOT_FOUND;
      severity = ErrorSeverity.LOW;
    }
    
    // Map to HTTP status if available
    httpStatus = errorTypeToHttpStatus[type];
    
    return new AppError({
      message: `${context}: ${error.message}`,
      type,
      severity,
      code: `ERR_${type.toUpperCase()}`,
      originalError: error,
      httpStatus,
      metadata
    });
  }

  // Handle string errors
  if (typeof error === 'string') {
    return new AppError({
      message: `${context}: ${error}`,
      metadata
    });
  }

  // Handle unknown errors
  return new AppError({
    message: `${context}: Unknown error occurred`,
    metadata: { 
      ...metadata,
      unknownError: error 
    }
  });
}

// Function to retry operations with exponential backoff
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    retries?: number;
    baseDelay?: number;
    maxDelay?: number;
    factor?: number;
    errorFilter?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    retries = 3,
    baseDelay = 300,
    maxDelay = 5000,
    factor = 2,
    errorFilter = () => true
  } = options;

  let lastError: Error;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Check if we should retry this error
      if (!errorFilter(lastError)) {
        throw lastError;
      }
      
      // If this was the last attempt, throw the error
      if (attempt === retries) {
        throw lastError;
      }
      
      // Calculate delay with exponential backoff and jitter
      const delay = Math.min(
        baseDelay * Math.pow(factor, attempt) * (0.8 + Math.random() * 0.4),
        maxDelay
      );
      
      logger.debug(`Retry attempt ${attempt + 1}/${retries} after ${delay}ms`, {
        error: lastError.message,
      });
      
      // Wait before the next attempt
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached due to the throw in the loop
  throw lastError!;
}

// Function to add timeout to async operations
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new AppError({
        message: errorMessage,
        type: ErrorType.NETWORK,
        severity: ErrorSeverity.MEDIUM,
        code: 'ERR_TIMEOUT'
      }));
    }, timeoutMs);

    promise
      .then(result => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}
