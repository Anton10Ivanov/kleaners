'use client'


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Immediately fetch the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({ 
        session, 
        user: session?.user ?? null, 
        isLoading: false, 
        isAuthenticated: !!session 
      });
    });

    // Listen for changes in authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          session,
          user: session?.user ?? null,
          isLoading: false,
          isAuthenticated: !!session,
        });
      }
    );

    // Clean up the listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return authState;
};
