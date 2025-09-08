/**
 * Enhanced authentication helpers with security features
 */

import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "./security";

export const secureSignOut = async (): Promise<void> => {
  try {
    // Clean up auth state first
    cleanupAuthState();
    
    // Attempt global sign out
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.warn('Global sign out failed:', err);
    }
    
    // Force page reload for clean state
    window.location.href = '/login';
  } catch (error) {
    console.error('Sign out error:', error);
    // Force reload even if sign out fails
    window.location.href = '/login';
  }
};

export const validatePasswordStrength = async (password: string): Promise<{
  isValid: boolean;
  isLeaked?: boolean;
  errors: string[];
}> => {
  try {
    const response = await supabase.functions.invoke('enhanced-auth-security', {
      body: {
        action: 'validate_password',
        password
      }
    });
    
    if (response.error) {
      throw response.error;
    }
    
    const { isValid, validation } = response.data;
    const errors: string[] = [];
    
    if (!validation.length) errors.push('Password must be at least 8 characters');
    if (!validation.uppercase) errors.push('Password must contain uppercase letters');
    if (!validation.lowercase) errors.push('Password must contain lowercase letters');
    if (!validation.number) errors.push('Password must contain numbers');
    if (!validation.special) errors.push('Password must contain special characters');
    
    // Check for leaked passwords
    const leakResponse = await supabase.functions.invoke('enhanced-auth-security', {
      body: {
        action: 'check_leaked_password',
        password
      }
    });
    
    const isLeaked = leakResponse.data?.isLeaked || false;
    if (isLeaked) {
      errors.push('This password has been found in data breaches');
    }
    
    return {
      isValid: isValid && !isLeaked,
      isLeaked,
      errors
    };
  } catch (error) {
    console.error('Password validation error:', error);
    // Fallback to client-side validation
    const errors: string[] = [];
    
    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain uppercase letters');
    if (!/[a-z]/.test(password)) errors.push('Password must contain lowercase letters');
    if (!/[0-9]/.test(password)) errors.push('Password must contain numbers');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must contain special characters');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};