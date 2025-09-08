
import { toast } from 'sonner';
import { ErrorSeverity } from './types';

/**
 * Handles API errors in a standardized way
 * @param error - The error object
 * @param fallbackMessage - Optional fallback message if error doesn't have one
 * @param component - Optional component name for logging
 * @param severity - Optional severity level
 
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
    case ErrorSeverity.HIGH:
      toast.error(`High priority: ${errorMessage}`);
      break;
    case ErrorSeverity.MEDIUM:
      toast.error(`Medium priority: ${errorMessage}`);
      break;
    case ErrorSeverity.LOW:
      toast.info(`Low priority: ${errorMessage}`);
      break;
    case ErrorSeverity.ERROR:
    default:
      toast.error(errorMessage);
  }
};

// For backward compatibility - support existing codebase
export const handleError = handleApiError;
