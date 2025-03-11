
import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  UserCog,
  Settings,
  MessageSquareText,
  BarChart,
  InboxIcon
} from 'lucide-react';
import { NavItem } from './NavItem';

export const getNavItems = (): NavItem[] => {
  return [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: 'Bookings',
      href: '/admin/bookings',
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      title: 'Pending Pool',
      href: '/admin/pending-pool',
      icon: <InboxIcon className="h-5 w-5" />,
    },
    {
      title: 'Customers',
      href: '/admin/customers',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Providers',
      href: '/admin/providers',
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      title: 'Questions',
      href: '/admin?tab=questions',
      icon: <MessageSquareText className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
};
