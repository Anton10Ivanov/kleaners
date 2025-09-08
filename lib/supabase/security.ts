/**
 * Security utilities for input validation and sanitization
 */

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const sanitizeHtml = (html: string): string => {
  // For server-side rendering, we'll use a simple sanitization
  // In production, consider using DOMPurify with jsdom
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Password validation
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate secure random tokens
export const generateSecureToken = (length: number = 32): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  return Array.from(randomValues, byte => charset[byte % charset.length]).join('');
};

// Rate limiting helpers
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
};

// Session cleanup utility
export const cleanupAuthState = (): void => {
  try {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to cleanup auth state:', error);
  }
};

// Enhanced password validation with security checks
export const validatePasswordStrength = async (password: string): Promise<{
  isValid: boolean;
  isLeaked?: boolean;
  errors: string[];
}> => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const config = await import('./config-validation').then(m => m.getAppConfig());
    
    const supabase = createClient(config.supabase.url, config.supabase.anonKey);
    
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
    const basicValidation = validatePassword(password);
    return {
      isValid: basicValidation.isValid,
      errors: basicValidation.errors
    };
  }
};
