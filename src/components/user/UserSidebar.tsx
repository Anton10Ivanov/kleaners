
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserIcon, 
  CreditCardIcon, 
  SettingsIcon,
  BellIcon,
  XIcon
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
  const { unreadCount } = useNotifications();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="h-5 w-5" />,
      href: '/user/dashboard'
    },
    {
      title: 'Bookings',
      icon: <CalendarIcon className="h-5 w-5" />,
      href: '/user/bookings'
    },
    {
      title: 'Notifications',
      icon: <BellIcon className="h-5 w-5" />,
      href: '/user/notifications',
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    {
      title: 'Profile',
      icon: <UserIcon className="h-5 w-5" />,
      href: '/user/profile'
    },
    {
      title: 'Invoices',
      icon: <CreditCardIcon className="h-5 w-5" />,
      href: '/user/invoices'
    },
    {
      title: 'Settings',
      icon: <SettingsIcon className="h-5 w-5" />,
      href: '/user/settings'
    }
  ];

  if (!isOpen && isMobile) return null;

  return (
    <div className={`${isMobile ? 'fixed inset-0 bg-white z-30 w-64 shadow-lg transition-all duration-300 ease-in-out' : 'w-64 h-screen fixed'}`}>
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="h-full space-y-4 py-4 overflow-y-auto">
        <div className="px-3 py-2 text-muted-foreground">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Client Dashboard
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors ${
                    isActive ? 'bg-accent text-accent-foreground' : 'transparent'
                  }`
                }
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </div>
                {item.badge && (
                  <Badge variant="default" className="bg-primary text-white">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
