
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserIcon, 
  CreditCardIcon, 
  SettingsIcon,
  BellIcon
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';

const UserSidebar = () => {
  const { unreadCount } = useNotifications();
  
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

  return (
    <div className="h-full space-y-4 py-4">
      <div className="px-3 py-2 text-muted-foreground">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Client Dashboard
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
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
  );
};

export default UserSidebar;
