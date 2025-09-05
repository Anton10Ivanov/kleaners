
import environmentUtils from '@/utils/environment';

/**
 * Development utilities for error debugging
 */
export const devUtils = {
  /**
   * Enhanced console logging for development
   */
  logError: (error: unknown, context?: string) => {
    if (environmentUtils.isPreviewWindow() || process.env.NODE_ENV === 'development') {
      console.group(`🔴 Error${context ? ` in ${context}` : ''}`);
      console.error(error);
      console.trace('Stack trace');
      console.groupEnd();
    }
  },

  /**
   * Log performance warnings
   */
  logPerformanceWarning: (message: string, data?: any) => {
    if (environmentUtils.isPreviewWindow() || process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Performance Warning: ${message}`, data);
    }
  },

  /**
   * Log component lifecycle events for debugging
   */
  logComponentEvent: (component: string, event: string, data?: any) => {
    if (environmentUtils.isPreviewWindow() || process.env.NODE_ENV === 'development') {
      console.log(`🔧 ${component}: ${event}`, data);
    }
  }
};
