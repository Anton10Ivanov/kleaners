
import { useApiQuery } from '@/hooks/useApiQuery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * User notification preferences
 */
interface NotificationPreferences {
  /** Email notifications for booking confirmations */
  emailBookingConfirmations: boolean;
  
  /** Email notifications for reminders */
  emailReminders: boolean;
  
  /** Email notifications for promotions */
  emailPromotions: boolean;
  
  /** SMS notifications for booking confirmations */
  smsBookingConfirmations: boolean;
  
  /** SMS notifications for reminders */
  smsReminders: boolean;
}

/**
 * User profile data interface
 */
export interface UserData {
  /** Unique user ID */
  id: string;
  
  /** User's first name */
  firstName: string;
  
  /** User's last name */
  lastName: string;
  
  /** User's email address */
  email: string;
  
  /** User's phone number */
  phone: string;
  
  /** User's profile image URL */
  avatar?: string;
  
  /** User's default address */
  address?: string;
  
  /** User's notification preferences */
  notificationPreferences: NotificationPreferences;
  
  /** When the profile was created */
  createdAt: string;
  
  /** When the profile was last updated */
  updatedAt: string;
}

/**
 * Result object returned by useUserProfileData hook
 */
interface UseUserProfileDataResult {
  /** User data object */
  userData: UserData | undefined;
  
  /** Whether user data is currently loading */
  isLoading: boolean;
  
  /** Error object if the fetch failed */
  error: Error | null;
  
  /** Function to update user profile data */
  updateUserProfile: (updates: Partial<UserData>) => Promise<void>;
  
  /** Function to manually refetch user data */
  refetch: () => void;
}

/**
 * Custom hook to fetch and manage user profile data
 * 
 * @returns {UseUserProfileDataResult} Object containing user data and management functions
 * 
 * @example
 * ```tsx
 * const { userData, isLoading, error, updateUserProfile } = useUserProfileData();
 * 
 * const handleSubmit = async (formData) => {
 *   await updateUserProfile({
 *     firstName: formData.firstName,
 *     lastName: formData.lastName
 *   });
 * };
 * ```
 */
export function useUserProfileData(): UseUserProfileDataResult {
  // Fetch user profile data from Supabase
  const fetchUserData = async (): Promise<UserData> => {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // In a real app, this would fetch from the 'profiles' table
    // Here we return mock data for demonstration
    return {
      id: user.user.id,
      firstName: "Alex",
      lastName: "Johnson",
      email: user.user.email || "alex@example.com",
      phone: "+1 555-123-4567",
      avatar: "https://i.pravatar.cc/150?u=" + user.user.id,
      address: "123 Main St, Apt 4B, New York, NY 10001",
      notificationPreferences: {
        emailBookingConfirmations: true,
        emailReminders: true,
        emailPromotions: false,
        smsBookingConfirmations: true,
        smsReminders: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  // Use the standardized API query hook
  const {
    data: userData,
    isLoading,
    error,
    refetch
  } = useApiQuery<UserData>({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    onErrorHandler: (error) => {
      toast.error('Failed to load profile data', {
        description: error.message
      });
    }
  });

  // Function to update user profile
  const updateUserProfile = async (updates: Partial<UserData>): Promise<void> => {
    try {
      // Get current user
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        throw new Error("User not authenticated");
      }
      
      // In a real app, this would update the 'profiles' table
      // For now, just show a success toast
      toast.success('Profile updated successfully', {
        description: 'Your profile information has been updated'
      });
      
      // Refetch the user data to get the latest
      refetch();
    } catch (error) {
      toast.error('Failed to update profile', {
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      throw error;
    }
  };

  return {
    userData,
    isLoading,
    error: error || null,
    updateUserProfile,
    refetch
  };
}
