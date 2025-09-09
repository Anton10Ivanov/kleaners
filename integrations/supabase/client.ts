import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

// Create a single instance of the Supabase client for client-side usage
export const supabase = createClient()