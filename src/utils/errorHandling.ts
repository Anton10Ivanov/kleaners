
import { logger } from './logging';

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

interface ErrorOptions {
  severity?: ErrorSeverity;
  component?: string;
  shouldRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  timeout?: number;
}

/**
 * Enhanced error handler for application-wide use
 * @param error The error object
 * @param message Custom error message
 * @param notify Whether to show a notification to the user
 * @param options Additional error handling options
 */
export function handleError(
  error: unknown,
  message = 'An error occurred',
  notify = true,
  options: ErrorOptions = {}
): void {
  // Set default options
  const {
    severity = ErrorSeverity.MEDIUM,
    component,
    shouldRetry = false,
    maxRetries = 3,
    retryDelay = 1000,
    timeout
  } = options;

  // Format error message
  let errorMessage = message;
  let errorDetails: Record<string, unknown> = {};

  if (error instanceof Error) {
    errorMessage = `${message}: ${error.message}`;
    errorDetails = {
      name: error.name,
      stack: error.stack,
    };
  } else if (typeof error === 'string') {
    errorMessage = `${message}: ${error}`;
  } else if (error && typeof error === 'object') {
    errorDetails = error as Record<string, unknown>;
  }

  // Log error based on severity
  const logContext = {
    ...errorDetails,
    severity,
    component,
  };

  // Log error based on severity
  switch (severity) {
    case ErrorSeverity.CRITICAL:
      logger.error(errorMessage, { ...logContext, isCritical: true }, component);
      break;
    case ErrorSeverity.HIGH:
      logger.error(errorMessage, logContext, component);
      break;
    case ErrorSeverity.MEDIUM:
      logger.warn(errorMessage, logContext, component);
      break;
    case ErrorSeverity.LOW:
      logger.info(errorMessage, logContext, component);
      break;
    default:
      logger.error(errorMessage, logContext, component);
  }

  // Client-side notification logic would go here
  if (notify && typeof window !== 'undefined') {
    // This could integrate with a toast notification system
    console.error(errorMessage);
  }

  // Implement retry logic if requested
  if (shouldRetry && typeof window !== 'undefined') {
    implementRetry(
      () => { throw error; },
      maxRetries,
      retryDelay
    );
  }

  // Implement timeout handling
  if (timeout && typeof window !== 'undefined') {
    setTimeout(() => {
      console.log(`Operation timed out after ${timeout}ms`);
    }, timeout);
  }
}

/**
 * Helper function to implement retry logic
 */
function implementRetry(
  operation: () => void,
  retriesLeft: number,
  delay: number
): void {
  try {
    operation();
  } catch (error) {
    if (retriesLeft > 0) {
      console.log(`Retrying operation. Attempts left: ${retriesLeft}`);
      setTimeout(() => {
        implementRetry(operation, retriesLeft - 1, delay);
      }, delay);
    } else {
      console.error('Maximum retry attempts reached');
      throw error;
    }
  }
}

// Helper function to create a timeout promise
export function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });
}

// Helper function to implement a promise with timeout
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    createTimeout(timeoutMs).catch(() => {
      throw new Error(errorMessage);
    })
  ]);
}
