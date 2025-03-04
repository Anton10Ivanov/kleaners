
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * User data interface
 * Represents a user's profile information
 */
export interface UserData {
  /** Unique identifier for the user */
  id: string;
  
  /** User's first name */
  firstName?: string;
  
  /** User's last name */
  lastName?: string;
  
  /** User's email address */
  email?: string;
  
  /** User's phone number */
  phone?: string;
  
  /** User's address */
  address?: string;
  
  /** URL to user's avatar image */
  avatarUrl?: string;
  
  /** When the user account was created */
  createdAt?: string;
}

/**
 * useUserProfileData hook
 * 
 * Custom hook for fetching and managing user profile data with React Query
 * 
 * @returns Object with user data and methods to interact with it
 */
export const useUserProfileData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  /**
   * Fetches user profile data from the Supabase database
   * @returns Promise resolving to user data
   */
  const fetchUserData = async (): Promise<UserData> => {
    // Get current authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("No authenticated user");
    }
    
    // Fetch profile data from customers table
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at
    };
  };
  
  /**
   * Updates the user profile in the database
   * @param userData - Updated user data to save
   * @returns Promise resolving to success status
   */
  const updateUserProfile = async (userData: UserData): Promise<boolean> => {
    if (!userData) {
      throw new Error("No user data to update");
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("No authenticated user");
    }
    
    const { error } = await supabase
      .from('customers')
      .update({
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        address: userData.address
      })
      .eq('id', user.id);
    
    if (error) {
      throw error;
    }
    
    return true;
  };

  // Query hook for fetching user data
  const userDataQuery = useQuery({
    queryKey: ['user-profile'],
    queryFn: fetchUserData,
    onError: (error: Error) => {
      console.error("Error fetching user profile:", error);
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: "We couldn't load your profile. Please try again later."
      });
    }
  });

  // Mutation hook for updating user data
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully."
      });
    },
    onError: (error: Error) => {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "We couldn't update your profile. Please try again."
      });
    }
  });

  return {
    userData: userDataQuery.data,
    isLoading: userDataQuery.isLoading,
    error: userDataQuery.error as Error | null,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    setUserData: (data: UserData) => queryClient.setQueryData(['user-profile'], data)
  };
};
