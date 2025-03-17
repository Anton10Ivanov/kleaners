
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UserCircle, 
  MessageSquare,
  Settings,
  Clock,
  InboxIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const TopNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: 'Dashboard', path: '/provider/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Bookings', path: '/provider/bookings', icon: <CalendarDays className="h-5 w-5" /> },
    { name: 'Messages', path: '/provider/messages', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Availability', path: '/provider/availability', icon: <Clock className="h-5 w-5" /> },
    { name: 'Pending Pool', path: '/provider/pending-pool', icon: <InboxIcon className="h-5 w-5" /> },
    { name: 'Profile', path: '/provider/profile', icon: <UserCircle className="h-5 w-5" /> },
    { name: 'Settings', path: '/provider/settings', icon: <Settings className="h-5 w-5" /> },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 overflow-x-auto">
      <div className="flex space-x-1 px-2 py-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap",
              currentPath === item.path
                ? "bg-primary/10 text-primary"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
