
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const useAuthState = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userRole, setUserRole] = useState<'client' | 'provider' | 'admin' | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // Immediately set user without waiting for profile data
        setUser(user);
        if (user) {
          // Get user type
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name, user_type')
            .eq('id', user.id)
            .single();
            
          if (!profileError && profileData) {
            setUserProfile(profileData);

            // Check if user is admin
            const { data: adminData } = await supabase
              .from('admin_roles')
              .select('role')
              .eq('user_id', user.id)
              .single();
              
            if (adminData) {
              setUserRole('admin');
            } else {
              setUserRole(profileData.user_type as 'client' | 'provider' || 'client');
            }
          } else {
            // Fallback display name
            setUserProfile({
              first_name: user.email?.split('@')[0] || "User"
            });
            setUserRole('client'); // Default role
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Immediately update user state for faster UI response
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Get user profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, last_name, user_type')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setUserProfile(profileData);

          // Check if user is admin
          const { data: adminData } = await supabase
            .from('admin_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();
            
          if (adminData) {
            setUserRole('admin');
          } else {
            setUserRole(profileData.user_type as 'client' | 'provider' || 'client');
          }
        } else {
          // Fallback display name
          setUserProfile({
            first_name: session.user.email?.split('@')[0] || "User"
          });
          setUserRole('client'); // Default role
        }
      } else {
        setUserProfile(null);
        setUserRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    loading,
    setLoading,
    user,
    userProfile,
    userRole
  };
};

export default useAuthState;
