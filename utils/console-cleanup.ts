/**
 * Console cleanup and error handling utilities
 * 
 * This utility helps transition from console pollution to proper logging
 * and error handling throughout the application.
 

import { logger } from './logging';
import { handleApiError, ErrorSeverity } from './errors';

/**
 * Replace console.log statements with proper logging
 
export const logInfo = (message: string, context?: Record<string, unknown>, component?: string) => {
  logger.info(message, context, component);
};

/**
 * Replace console.warn statements with proper logging
 
export const logWarning = (message: string, context?: Record<string, unknown>, component?: string) => {
  logger.warn(message, context, component);
};

/**
 * Replace console.error statements with proper error handling
 
export const logError = (
  message: string, 
  error?: unknown, 
  component?: string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM
) => {
  const errorContext = {
    error: error instanceof Error ? error.message : error,
    timestamp: new Date().toISOString(),
  };
  
  logger.error(message, errorContext, component);
  
  // If it's a critical error, also handle it through the error system
  if (severity === ErrorSeverity.HIGH || severity === ErrorSeverity.CRITICAL) {
    handleApiError(error, message, component, severity);
  }
};

/**
 * Replace console.debug statements with proper logging
 
export const logDebug = (message: string, context?: Record<string, unknown>, component?: string) => {
  logger.debug(message, context, component);
};

/**
 * Helper for form submission logging
 
export const logFormSubmission = (formName: string, data: Record<string, unknown>, component?: string) => {
  logger.info(`Form submission: ${formName}`, { 
    formDataKeys: Object.keys(data),
    timestamp: new Date().toISOString()
  }, component);
};

/**
 * Helper for API call logging
 
export const logApiCall = (endpoint: string, method: string, component?: string) => {
  logger.debug(`API call: ${method} ${endpoint}`, { 
    endpoint, 
    method,
    timestamp: new Date().toISOString()
  }, component);
};

/**
 * Helper for performance logging
 
export const logPerformance = (operation: string, duration: number, component?: string) => {
  if (duration > 100) { // Log only if operation takes more than 100ms
    logger.warn(`Performance: ${operation}`, { 
      duration: `${duration.toFixed(2)}ms`,
      operation
    }, component);
  }
};

/**
 * Helper for user action logging
 
export const logUserAction = (action: string, details?: Record<string, unknown>, component?: string) => {
  logger.info(`User action: ${action}`, details, component);
};
