
/**
 * Environment utilities for the application
 */
export const environmentUtils = {
  // Check if running in development mode
  isDevelopment: (): boolean => {
    return import.meta.env.DEV;
  },

  // Check if running in production mode
  isProduction: (): boolean => {
    return import.meta.env.PROD;
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

  // Check if running in Lovable sandbox
  isLovableSandbox: (): boolean => {
    return typeof window !== 'undefined' && window.location.href.includes('lovable.dev');
  },

  // Get environment variable with validation
  getEnvVar: (key: string, defaultValue?: string): string => {
    return import.meta.env[key] || defaultValue || '';
  },

  // Get required environment variable (throws if missing)
  getRequiredEnvVar: (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return value;
  },

  // Validate all required environment variables
  validateRequiredVars: (requiredVars: string[]): void => {
    const missing = requiredVars.filter(key => !import.meta.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  },

  // Check if feature flags are enabled
  isFeatureEnabled: (feature: string): boolean => {
    return import.meta.env[`VITE_FEATURE_${feature.toUpperCase()}`] === 'true';
  },

  // Resolve image path for different environments
  resolveImagePath: (src: string): string => {
    if (src.startsWith('http') || src.startsWith('/')) {
      return src;
    }
    return `/src/assets/${src}`;
  },

  // Feature flags object
  features: {
    enablePreloading: (): boolean => {
      return import.meta.env.VITE_FEATURE_PRELOADING !== 'false';
    }
  }
};

export default environmentUtils;
