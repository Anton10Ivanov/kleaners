
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { navigationData } from './navigationData';
import { BellIcon, User, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationCenter } from '../notifications/NotificationCenter';

interface NavigationMenuProps {
  isLoggedIn: boolean;
  userType: string;
}

export function NavigationMenu({ isLoggedIn, userType }: NavigationMenuProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { unreadCount } = useNotifications();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    switch (userType) {
      case 'admin':
        return '/admin';
      case 'provider':
        return '/provider/dashboard';
      default:
        return '/user/dashboard';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isLoggedIn && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <NotificationCenter />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={getDashboardLink()}>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <Link to="/user/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link to="/user/bookings">
                <DropdownMenuItem>My Bookings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      
      {!isLoggedIn && (
        <div className="space-x-2">
          <Link to="/auth/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/auth/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
