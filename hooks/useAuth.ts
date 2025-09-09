'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: 'client' | 'provider' | 'admin' | null;
  userProfile: any;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    userRole: null,
    userProfile: null,
  });

  const fetchUserProfile = async (user: User) => {
    try {
      // Get user profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name, user_type')
        .eq('id', user.id)
        .single();
        
      if (profileData) {
        // Check if user is admin
        const { data: adminData } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
          
        const userRole = adminData ? 'admin' : (profileData.user_type as 'client' | 'provider' || 'client');
        
        return {
          userProfile: profileData,
          userRole
        };
      } else {
        // Fallback display name
        return {
          userProfile: {
            first_name: user.email?.split('@')[0] || "User"
          },
          userRole: 'client' as const
        };
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        userProfile: {
          first_name: user.email?.split('@')[0] || "User"
        },
        userRole: 'client' as const
      };
    }
  };

  useEffect(() => {
    // Immediately fetch the current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { userProfile, userRole } = await fetchUserProfile(session.user);
        setAuthState({ 
          session, 
          user: session.user, 
          isLoading: false, 
          isAuthenticated: true,
          userProfile,
          userRole
        });
      } else {
        setAuthState({ 
          session, 
          user: null, 
          isLoading: false, 
          isAuthenticated: false,
          userProfile: null,
          userRole: null
        });
      }
    });

    // Listen for changes in authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { userProfile, userRole } = await fetchUserProfile(session.user);
          setAuthState({
            session,
            user: session.user,
            isLoading: false,
            isAuthenticated: true,
            userProfile,
            userRole
          });
        } else {
          setAuthState({
            session,
            user: null,
            isLoading: false,
            isAuthenticated: false,
            userProfile: null,
            userRole: null
          });
        }
      }
    );

    // Clean up the listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return authState;
};
