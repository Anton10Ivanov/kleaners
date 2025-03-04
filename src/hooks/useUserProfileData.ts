
import { useApiQuery } from '@/hooks/useApiQuery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Interface for notification preferences
 */
export interface NotificationPreferences {
  /** Email notifications for booking updates */
  emailBookingUpdates: boolean;
  
  /** Email notifications for promotions */
  emailPromotions: boolean;
  
  /** SMS notifications for booking reminders */
  smsReminders: boolean;
  
  /** Mobile push notifications */
  pushNotifications: boolean;
}

/**
 * Interface for account preferences
 */
export interface AccountPreferences {
  /** Preferred language */
  language: string;
  
  /** Dark mode preference */
  darkMode: boolean;
  
  /** Email visibility */
  showEmail: boolean;
  
  /** Phone visibility */
  showPhone: boolean;
}

/**
 * Interface for user data
 */
export interface UserData {
  /** User's unique identifier */
  id: string;
  
  /** User's full name */
  fullName: string;
  
  /** User's email address */
  email: string;
  
  /** User's phone number */
  phone: string;
  
  /** URL to user's avatar image */
  avatarUrl: string;
  
  /** User's notification preferences */
  notificationPreferences: NotificationPreferences;
  
  /** User's account preferences */
  accountPreferences: AccountPreferences;
  
  /** User's created date */
  createdAt: string;
}

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'medium' | 'strong' | null;

/**
 * Result interface for useUserProfileData hook
 */
export interface UseUserProfileDataResult {
  /** User profile data */
  profile: UserData | null;
  
  /** Whether profile data is loading */
  isLoading: boolean;
  
  /** Error object if fetch failed */
  error: Error | null;
  
  /** Function to update profile */
  updateProfile: (updates: Partial<UserData>) => Promise<boolean>;
  
  /** Function to update avatar */
  updateAvatar: (url: string) => Promise<void>;
  
  /** Current password strength */
  passwordStrength: PasswordStrength;
  
  /** Function to check password strength */
  checkPasswordStrength: (password: string) => void;
  
  /** Function to change password */
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

/**
 * Hook to fetch and manage user profile data
 * 
 * @returns {UseUserProfileDataResult} User profile data and management functions
 * 
 * @example
 * ```tsx
 * const { profile, isLoading, updateProfile } = useUserProfileData();
 * 
 * if (isLoading) return <Loading />;
 * 
 * return <ProfileForm profile={profile} onSave={updateProfile} />;
 * ```
 */
export function useUserProfileData(): UseUserProfileDataResult {
  // Mock password strength state
  let passwordStrength: PasswordStrength = null;

  // Fetch user profile
  const fetchUserProfile = async (): Promise<UserData> => {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // For demo purposes - in a real app, this would fetch from Supabase
    return {
      id: "123",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatarUrl: "/placeholder.svg",
      notificationPreferences: {
        emailBookingUpdates: true,
        emailPromotions: false,
        smsReminders: true,
        pushNotifications: false
      },
      accountPreferences: {
        language: "en",
        darkMode: false,
        showEmail: true,
        showPhone: false
      },
      createdAt: "2023-01-15T00:00:00Z"
    };
  };

  const { 
    data: profile,
    isLoading,
    error,
    refetch
  } = useApiQuery<UserData>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    onErrorHandler: (error) => {
      toast.error('Failed to load profile', {
        description: error.message
      });
    }
  });

  /**
   * Update user profile
   */
  const updateProfile = async (updates: Partial<UserData>): Promise<boolean> => {
    try {
      // In a real app, this would update the user profile in Supabase
      toast.success('Profile updated successfully');
      await refetch();
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  /**
   * Update user avatar
   */
  const updateAvatar = async (url: string): Promise<void> => {
    try {
      // In a real app, this would update the avatar URL in Supabase
      toast.success('Avatar updated successfully');
      await updateProfile({ avatarUrl: url });
    } catch (error) {
      toast.error('Failed to update avatar');
    }
  };

  /**
   * Check password strength
   */
  const checkPasswordStrength = (password: string): void => {
    if (!password) {
      passwordStrength = null;
      return;
    }
    
    if (password.length < 8) {
      passwordStrength = 'weak';
    } else if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      passwordStrength = 'medium';
    } else {
      passwordStrength = 'strong';
    }
  };

  /**
   * Change user password
   */
  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // In a real app, this would update the password in Supabase Auth
      toast.success('Password changed successfully');
      return true;
    } catch (error) {
      toast.error('Failed to change password');
      return false;
    }
  };

  return {
    profile,
    isLoading,
    error: error || null,
    updateProfile,
    updateAvatar,
    passwordStrength,
    checkPasswordStrength,
    changePassword
  };
}
