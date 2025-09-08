
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
  const location = usePathname();
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
    <div className="bg-primary dark:bg-primary overflow-x-auto">
      <div className="flex space-x-1 px-2 py-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center px-3 section-spacing-xs text-sm font-medium rounded-md whitespace-nowrap",
              currentPath === item.path
                ? "bg-accent/10 text-accent"
                : "text-primary-foreground hover:text-accent hover:bg-accent/10"
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
