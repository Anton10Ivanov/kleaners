
import { useApiQuery } from '@/hooks/useApiQuery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserData } from './types';
import { usePasswordManagement } from './usePasswordManagement';
import { useAvatarManagement } from './useAvatarManagement';

/**
 * Hook to fetch and manage user profile data
 * 
 * @returns User profile data and management functions
 * 
 * @example
 * ```tsx
 * const { profile, isLoading, updateProfile } = useProfileData();
 * 
 * if (isLoading) return <Loading />;
 * 
 * return <ProfileForm profile={profile} onSave={updateProfile} />;
 * ```
 
export function useProfileData() {
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
   
  const updateProfile = async (updates: Partial<UserData>): Promise<void> => {
    try {
      // In a real app, this would update the user profile in Supabase
      toast.success('Profile updated successfully');
      await refetch();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  // Import password management functions
  const passwordManagement = usePasswordManagement();
  
  // Import avatar management functions
  const avatarManagement = useAvatarManagement(updateProfile);

  return {
    profile,
    isLoading,
    error: error || null,
    updateProfile,
    ...passwordManagement,
    ...avatarManagement
  };
}
