import React from 'react';
import { ResponsiveNavbar } from './ResponsiveNavbar';
import useAuthState from './auth/useAuthState';
import { supabase } from '@/integrations/supabase/client';

export const Navbar: React.FC = () => {
  const { loading, user, userProfile, userRole, setLoading } = useAuthState();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveNavbar 
      user={user ? {
        name: userProfile?.first_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar: user.user_metadata?.avatar_url,
        role: userRole || 'client'
      } : undefined}
      userProfile={userProfile}
      userRole={userRole}
      onLogout={handleLogout}
    />
  );
};
export default Navbar;
