
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AdminContextType = {
  isAdmin: boolean;
  isLoading: boolean;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in and is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // For simplicity, we're considering any authenticated user as admin
          // In a production environment, you would check against a roles table
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    // Set up listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsAdmin(!!session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Admin login function
  const loginAsAdmin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });

      setIsAdmin(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Admin logout function
  const logoutAdmin = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: error.message,
        });
        throw error;
      }

      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    isAdmin,
    isLoading,
    loginAsAdmin,
    logoutAdmin,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
