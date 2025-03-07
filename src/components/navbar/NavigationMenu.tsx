
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationData } from './navigationData';
import { DynamicIcon } from './icons';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { useMediaQuery } from '@/hooks/use-media-query';

export function NavigationMenu() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your booking has been confirmed!', read: false },
    { id: 2, text: 'Provider John Smith will arrive tomorrow at 9 AM', read: false },
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Close notifications when changing pages
  useEffect(() => {
    setIsNotificationOpen(false);
  }, [location.pathname]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className={cn(
      "flex items-center space-x-4",
      isMobile ? "justify-between w-full" : "justify-end"
    )}>
      <div className="hidden md:flex items-center space-x-6">
        {navigationData.mainNav.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>

          {isNotificationOpen && (
            <NotificationCenter 
              isOpen={isNotificationOpen} 
              onClose={() => setIsNotificationOpen(false)} 
            />
          )}
        </div>
      </div>
    </nav>
  );
}
