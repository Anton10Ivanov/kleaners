
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

  // Get environment variable
  getEnvVar: (key: string, defaultValue?: string): string => {
    return import.meta.env[key] || defaultValue || '';
  },

  // Check if feature flags are enabled
  isFeatureEnabled: (feature: string): boolean => {
    return import.meta.env[`VITE_FEATURE_${feature.toUpperCase()}`] === 'true';
  }
};

export default environmentUtils;
