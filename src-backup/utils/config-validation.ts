/**
 * Configuration validation utilities
 * Ensures all required environment variables are present
 */

export interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  mapbox?: {
    token: string;
  };
  features: {
    enableMockApi: boolean;
    enablePreloading: boolean;
  };
}

/**
 * Validates and returns application configuration
 * Throws error if required variables are missing
 */
export const validateAppConfig = (): AppConfig => {
  // Required variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL environment variable is required');
  }

  if (!supabaseAnonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY environment variable is required');
  }

  // Optional variables
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    mapbox: mapboxToken ? { token: mapboxToken } : undefined,
    features: {
      enableMockApi: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
      enablePreloading: import.meta.env.VITE_FEATURE_PRELOADING !== 'false',
    },
  };
};

/**
 * Get configuration with validation
 * Cached after first call
 */
let cachedConfig: AppConfig | null = null;

export const getAppConfig = (): AppConfig => {
  if (!cachedConfig) {
    cachedConfig = validateAppConfig();
  }
  return cachedConfig;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof AppConfig['features']): boolean => {
  return getAppConfig().features[feature];
};

/**
 * Check if optional services are configured
 */
export const isMapboxConfigured = (): boolean => {
  return !!getAppConfig().mapbox?.token;
};