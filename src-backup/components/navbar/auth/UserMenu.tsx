
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Loader2, 
  UserCircle, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  ShieldCheck, 
  User, 
  Home 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserMenuProps {
  loading: boolean;
  user: any;
  userProfile: any;
  userRole: 'client' | 'provider' | 'admin' | null;
  setLoading: (loading: boolean) => void;
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
      <Button variant="ghost" size="sm" disabled className="min-h-[44px]">
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 min-h-[44px] px-3">
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
      <DropdownMenuContent align="end" className="w-50 bg-white dark:bg-gray-800 z-50">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/')}>
          <Home className="mr-2 h-4 w-4" />
          <span>Homepage</span>
        </DropdownMenuItem>
        
        {userRole === 'client' && (
          <DropdownMenuItem onClick={() => navigate('/client/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Client Dashboard</span>
          </DropdownMenuItem>
        )}
        
        {userRole === 'provider' && (
          <DropdownMenuItem onClick={() => navigate('/provider/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Provider Dashboard</span>
          </DropdownMenuItem>
        )}
        
        {userRole === 'client' && (
          <DropdownMenuItem onClick={() => navigate('/client/bookings')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Bookings</span>
          </DropdownMenuItem>
        )}
        
        {userRole === 'provider' && (
          <DropdownMenuItem onClick={() => navigate('/provider/assignments')}>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>My Assignments</span>
          </DropdownMenuItem>
        )}
        
        {userRole === 'admin' && (
          <DropdownMenuItem onClick={() => navigate('/admin')}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Admin Panel</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem 
          onClick={() => navigate(userRole === 'provider' ? '/provider/profile' : '/client/profile-settings')}
        >
          <User className="mr-2 h-4 w-4" />
          <span>{userRole === 'provider' ? 'Profile' : 'Profile Settings'}</span>
        </DropdownMenuItem>
        
        {userRole === 'provider' && (
          <DropdownMenuItem 
            onClick={() => navigate('/provider/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
