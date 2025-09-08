/**
 * Configuration validation utilities for Next.js
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is required');
  }

  if (!supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable is required');
  }

  // Optional variables
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    mapbox: mapboxToken ? { token: mapboxToken } : undefined,
    features: {
      enableMockApi: process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true',
      enablePreloading: process.env.NEXT_PUBLIC_FEATURE_PRELOADING !== 'false',
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

/**
 * Validate Supabase connection
 */
export const validateSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const config = getAppConfig();
    
    const supabase = createClient(config.supabase.url, config.supabase.anonKey);
    
    // Test connection with a simple query
    const { error } = await supabase.from('profiles').select('count').limit(1);
    
    return !error;
  } catch (error) {
    console.error('Supabase connection validation failed:', error);
    return false;
  }
};
