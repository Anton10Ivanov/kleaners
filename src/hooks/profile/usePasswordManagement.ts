
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook for password strength checking and password management
 * 
 * @returns Functions and state for password management
 */
export function usePasswordManagement() {
  // Password strength state (as a number from 0-100)
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  /**
   * Check password strength and return a value from 0-100
   */
  const checkPasswordStrength = (password: string): void => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    
    // Basic length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    
    // Character type checks
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    setPasswordStrength(strength);
  };

  /**
   * Change user password
   * @returns {Promise<void>} Promise that resolves when password is changed
   */
  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      // In a real app, this would update the password in Supabase Auth
      // For demo purposes, we'll simulate a successful password change
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Password changed successfully');
      return;
    } catch (error) {
      toast.error('Failed to change password');
      throw error; // Re-throw to allow the component to handle the error
    }
  };

  return {
    passwordStrength,
    checkPasswordStrength,
    changePassword
  };
}
