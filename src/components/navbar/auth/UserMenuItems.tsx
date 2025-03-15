
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  Calendar, 
  ClipboardList, 
  ShieldCheck, 
  User, 
  Home 
} from 'lucide-react';

interface UserMenuItemsProps {
  userRole: 'client' | 'provider' | 'admin' | null;
  onLogout: () => Promise<void>;
}

const UserMenuItems: React.FC<UserMenuItemsProps> = ({ userRole, onLogout }) => {
  const navigate = useNavigate();
  
  // Handle navigation with proper client-side routing
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {/* Home Link for everyone */}
      <DropdownMenuItem onClick={() => handleNavigation('/')}>
        <Home className="mr-2 h-4 w-4" />
        <span>Homepage</span>
      </DropdownMenuItem>
      
      {/* Dashboard based on role */}
      {userRole === 'client' && (
        <DropdownMenuItem onClick={() => handleNavigation('/client/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Client Dashboard</span>
        </DropdownMenuItem>
      )}
      
      {userRole === 'provider' && (
        <DropdownMenuItem onClick={() => handleNavigation('/provider/dashboard')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>Provider Dashboard</span>
        </DropdownMenuItem>
      )}
      
      {/* Role-specific functionality */}
      {userRole === 'client' && (
        <DropdownMenuItem onClick={() => handleNavigation('/client/bookings')}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>My Bookings</span>
        </DropdownMenuItem>
      )}
      
      {userRole === 'provider' && (
        <DropdownMenuItem onClick={() => handleNavigation('/provider/bookings')}>
          <ClipboardList className="mr-2 h-4 w-4" />
          <span>My Assignments</span>
        </DropdownMenuItem>
      )}
      
      {/* Admin panel access */}
      {userRole === 'admin' && (
        <DropdownMenuItem onClick={() => handleNavigation('/admin')}>
          <ShieldCheck className="mr-2 h-4 w-4" />
          <span>Admin Panel</span>
        </DropdownMenuItem>
      )}
      
      {/* Common functionality for all users */}
      <DropdownMenuItem onClick={() => handleNavigation(userRole === 'provider' ? '/provider/profile' : '/client/profile')}>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>
      
      <DropdownMenuItem onClick={() => handleNavigation(userRole === 'provider' ? '/provider/settings' : '/client/settings')}>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>
      
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );
};

export default UserMenuItems;
