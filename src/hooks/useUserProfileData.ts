
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserData {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export const useUserProfileData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Get current authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No authenticated user");
        
        // Fetch profile data from customers table
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        setUserData({
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          avatarUrl: data.avatar_url,
          createdAt: data.created_at
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error as Error);
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: "We couldn't load your profile. Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const updateProfile = async () => {
    try {
      if (!userData) throw new Error("No user data to update");
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");
      
      const { error } = await supabase
        .from('customers')
        .update({
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          address: userData.address
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully."
      });
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "We couldn't update your profile. Please try again."
      });
      throw error;
    }
  };

  return { 
    userData, 
    isLoading, 
    error,
    updateProfile,
    setUserData
  };
};
