
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';
import { handleError } from '../../utils/errors';
import { logger } from '../../utils/logging';

// Validate required environment variables
const validateEnvironmentVariables = () => {
  const requiredVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY
  };

  const missing = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return requiredVars;
};

// Get validated environment variables
const env = validateEnvironmentVariables();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

// Log initialization
logger.info('Initializing Supabase client', { supabaseUrl: supabaseUrl ? 'Configured' : 'Using fallback' });

// Enhanced client with error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: (url, options) => {
      return fetch(url, options).catch(error => {
        handleError(error, "Network request failed", "high");
        throw error;
      });
    }
  }
});
