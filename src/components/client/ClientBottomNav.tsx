
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CalendarDays, MessageSquare, FileText, User } from 'lucide-react';

const ClientBottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    {
      label: 'Bookings',
      icon: CalendarDays,
      href: '/client/bookings',
      active: pathname === '/client/bookings',
    },
    {
      label: 'Messages',
      icon: MessageSquare,
      href: '/client/messages',
      active: pathname === '/client/messages',
    },
    {
      label: 'Invoices',
      icon: FileText,
      href: '/client/invoices',
      active: pathname === '/client/invoices',
    },
    {
      label: 'Profile',
      icon: User,
      href: '/client/profile',
      active: pathname === '/client/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border h-16 px-4 flex items-center justify-around z-50">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            'flex flex-col items-center justify-center gap-1',
            'text-xs font-medium',
            item.active ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default ClientBottomNav;
