
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { UserCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import UserMenuItems from './UserMenuItems';

interface UserMenuProps {
  loading: boolean;
  user: any;
  userProfile: any;
  userRole: 'client' | 'provider' | 'admin' | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  loading, 
  user, 
  userProfile, 
  userRole,
  setLoading 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.'
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to log out. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          <span className="hidden md:inline">
            {userProfile?.first_name || user.email || 'My Account'}
            {userRole && (
              <span className="ml-1 text-xs opacity-70">
                ({userRole === 'provider' ? 'Provider' : userRole === 'admin' ? 'Admin' : 'Client'})
              </span>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50">
        <UserMenuItems userRole={userRole} onLogout={handleLogout} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
