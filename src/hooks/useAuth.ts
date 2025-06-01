
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'client' | 'provider' | 'admin' | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    // Simulate auth check - in real app, this would check with Supabase
    const checkAuth = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock user data - replace with actual auth logic
        const mockUser: User = {
          id: '123',
          email: 'user@example.com',
          role: null
        };

        setAuthState({
          user: mockUser,
          isLoading: false,
          isAuthenticated: true
        });
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '123',
        email,
        role: null
      };

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true
      });
      
      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};
