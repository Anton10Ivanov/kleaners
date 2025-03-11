
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database';
import { handleError } from '../../utils/errors';
import { logger } from '../../utils/logging';

// Use direct values for now to fix the immediate error
const supabaseUrl = 'https://goldvhaiyzrlighyobbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvbGR2aGFpeXpybGlnaHlvYmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NTkxNzIsImV4cCI6MjA1NTIzNTE3Mn0.7RP-GHb1iNvTFwPpf3rT6q62oDasPj4UPKOL1hHz5VI';

// Log initialization
logger.info('Initializing Supabase client', { url: supabaseUrl });

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

