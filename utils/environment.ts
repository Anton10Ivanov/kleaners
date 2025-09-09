
/**
 * Environment utilities for the application
 */
export const environmentUtils = {
  // Check if running in development mode
  isDevelopment: (): boolean => {
    return process.env.NODE_ENV === 'development';
  },

  // Check if running in production mode
  isProduction: (): boolean => {
    return process.env.NODE_ENV === 'production';
  },

  // Check if running on server side
  isServerSide: (): boolean => {
    return typeof window === 'undefined';
  },

  // Check if running on client side
  isClientSide: (): boolean => {
    return typeof window !== 'undefined';
  },

  // Check if running in preview window
  isPreviewWindow: (): boolean => {
    return typeof window !== 'undefined' && window.location.href.includes('preview');
  },


  // Get environment variable with validation
  getEnvVar: (key: string, defaultValue?: string): string => {
    return process.env[key] || defaultValue || '';
  },

  // Get required environment variable (throws if missing)
  getRequiredEnvVar: (key: string): string => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value;
  },

  // Validate all required environment variables
  validateRequiredVars: (requiredVars: string[]): void => {
    const missing = requiredVars.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  },

  // Check if feature flags are enabled
  isFeatureEnabled: (feature: string): boolean => {
    return process.env[`NEXT_PUBLIC_FEATURE_${feature.toUpperCase()}`] === 'true';
  },

  // Resolve image path for different environments
  resolveImagePath: (src: string): string => {
    if (src.startsWith('http') || src.startsWith('/')) {
      return src;
    }
    return `/Images/${src}`;
  },

  // Feature flags object
  features: {
    enablePreloading: (): boolean => {
      return process.env.NEXT_PUBLIC_FEATURE_PRELOADING !== 'false';
    }
  }
};

export default environmentUtils;
