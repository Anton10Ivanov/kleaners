
// This file contains type definitions that can be used throughout the application

declare module '@supabase/supabase-js' {
  interface Customer {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    notes?: string | null;
    password?: string | null;
    username?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    avatar_url?: string | null;
  }
}
