
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UserCircle, 
  MessageSquare,
  InboxIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ProviderBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: 'Dashboard', path: '/provider/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Bookings', path: '/provider/bookings', icon: <CalendarDays className="h-5 w-5" /> },
    { name: 'Pending', path: '/provider/pending-pool', icon: <InboxIcon className="h-5 w-5" /> },
    { name: 'Messages', path: '/provider/messages', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Profile', path: '/provider/profile', icon: <UserCircle className="h-5 w-5" /> },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center",
              currentPath === item.path
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProviderBottomNav;
