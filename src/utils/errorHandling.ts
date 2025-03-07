
import { toast } from 'sonner';
import { FieldValues, FieldErrors } from 'react-hook-form';

/**
 * Error severity levels for enhanced error reporting
 */
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Display form errors as toast notifications
 * @param errors - Form errors object from react-hook-form
 */
export const displayFormErrors = <T extends FieldValues>(errors: FieldErrors<T>) => {
  // Get all error messages
  const errorMessages = Object.values(errors)
    .map(error => error?.message)
    .filter(Boolean);
  
  // Display unique error messages
  [...new Set(errorMessages)].forEach(message => {
    if (typeof message === 'string') {
      toast.error(message);
    }
  });
};

/**
 * Handles API errors in a standardized way
 * @param error - The error object
 * @param fallbackMessage - Optional fallback message if error doesn't have one
 * @param component - Optional component name for logging
 * @param severity - Optional severity level
 */
export const handleApiError = (
  error: unknown, 
  fallbackMessage = 'An error occurred. Please try again.',
  component?: string,
  severity: ErrorSeverity = ErrorSeverity.ERROR
) => {
  // Log with component context if provided
  const logPrefix = component ? `[${component}]` : '';
  console.error(`${logPrefix} API Error:`, error);
  
  let errorMessage = fallbackMessage;
  
  if (typeof error === 'object' && error !== null) {
    // Try to extract error message from various common formats
    const anyError = error as any;
    
    if (anyError.message) {
      errorMessage = anyError.message;
    } else if (anyError.error?.message) {
      errorMessage = anyError.error.message;
    } else if (anyError.data?.message) {
      errorMessage = anyError.data.message;
    }
  }
  
  // Display toast based on severity
  switch (severity) {
    case ErrorSeverity.INFO:
      toast.info(errorMessage);
      break;
    case ErrorSeverity.WARNING:
      toast.warning(errorMessage);
      break;
    case ErrorSeverity.CRITICAL:
      // For critical errors, we might want to do something more
      toast.error(`Critical error: ${errorMessage}`);
      break;
    case ErrorSeverity.ERROR:
    default:
      toast.error(errorMessage);
  }
};

// For backward compatibility - support existing codebase
export const handleError = handleApiError;

/**
 * Developer debugging utility - logs debug information during development
 */
export const devDebug = (context: string, data: unknown, type: 'log' | 'info' | 'warn' | 'error' = 'log') => {
  if (import.meta.env.DEV) {
    const prefix = `[DEV-DEBUG][${context}]`;
    switch (type) {
      case 'info':
        console.info(prefix, data);
        break;
      case 'warn':
        console.warn(prefix, data);
        break;
      case 'error':
        console.error(prefix, data);
        break;
      case 'log':
      default:
        console.log(prefix, data);
    }
  }
};

/**
 * Utility for measuring performance of operations during development
 */
export const measurePerformance = (name: string, operation: () => any) => {
  if (import.meta.env.DEV) {
    console.time(`[PERF][${name}]`);
    const result = operation();
    console.timeEnd(`[PERF][${name}]`);
    return result;
  }
  return operation();
};
