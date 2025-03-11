
/**
 * Error severity levels for application logging and handling
 */
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Handles API errors with consistent logging and optional user feedback
 * 
 * @param error - The error object caught
 * @param userMessage - Optional message to display to the user
 * @param source - Component or function where the error occurred
 * @param severity - Error severity level
 */
export const handleApiError = (
  error: unknown, 
  userMessage?: string, 
  source?: string, 
  severity: ErrorSeverity = ErrorSeverity.ERROR
) => {
  // Log the error to console with source information
  console.error(
    `[${severity.toUpperCase()}]${source ? ` [${source}]` : ''}: `,
    error instanceof Error ? error.message : error
  );

  // In a production app, you might send errors to a monitoring service here
  
  // Return user-friendly message that can be used by UI components
  return {
    message: userMessage || 'An unexpected error occurred. Please try again.',
    severity,
    timestamp: new Date().toISOString()
  };
};

/**
 * General error handler for catching errors throughout the application
 * 
 * @param error - The error to handle
 * @param context - Optional context information about where the error occurred
 */
export const handleError = (error: unknown, context?: string) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const contextInfo = context ? ` in ${context}` : '';
  
  console.error(`Error${contextInfo}: ${errorMessage}`);
  
  // Log additional details if available
  if (error instanceof Error && error.stack) {
    console.debug('Stack trace:', error.stack);
  }
  
  // In a production app, you might send errors to a monitoring service here
  
  return {
    message: errorMessage,
    context
  };
};
