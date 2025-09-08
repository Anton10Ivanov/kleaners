'use client'


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAdminProfile = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      console.log("Fetching user profile on dashboard component...");
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log("User found:", user.id);
        
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            setUserName("Admin User");
            return;
          }
          
          if (profile?.first_name || profile?.last_name) {
            setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim());
          } else {
            setUserName(user.email);
          }
        } catch (error) {
          console.error("Profile fetch error:", error);
          setUserName("Admin User");
        }
      } else {
        setUserName("Admin User");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserName("Admin User");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return { userName };
};
