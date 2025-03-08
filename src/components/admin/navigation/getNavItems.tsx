
import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  UserCog,
  Settings,
  MessageSquareText,
  BarChart,
  Calendar
} from 'lucide-react';
import { NavItem } from './NavItem';

export function getNavItems(): NavItem[] {
  const items: NavItem[] = [
    {
      title: 'Admin Home',
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
      title: 'Support Queries',
      href: '/admin/support-queries',
      icon: <MessageSquareText className="h-5 w-5" />,
    },
    {
      title: 'Vacation Requests',
      href: '/admin/vacation-requests',
      icon: <Calendar className="h-5 w-5" />,
      description: "Manage provider vacation requests",
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return items;
}
