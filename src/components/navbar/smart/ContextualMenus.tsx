
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextualMenusProps {
  userRole?: 'client' | 'provider' | 'admin' | null;
  className?: string;
}

export const ContextualMenus: React.FC<ContextualMenusProps> = ({
  userRole,
  className
}) => {
  const location = useLocation();

  const contextualItems = useMemo(() => {
    const path = location.pathname;
    
    // Homepage context
    if (path === '/') {
      return [
        { label: 'Popular Services', icon: Star, href: '/services', badge: 'Hot' },
        { label: 'Service Areas', icon: MapPin, href: '/areas' },
        { label: 'Quick Quote', icon: Clock, href: '/quote' }
      ];
    }

    // Services page context
    if (path.startsWith('/services')) {
      return [
        { label: 'Book Now', icon: Clock, href: '/booking', badge: 'Fast' },
        { label: 'Compare Services', icon: Star, href: '/compare' },
        { label: 'Service Areas', icon: MapPin, href: '/areas' }
      ];
    }

    // User dashboard context
    if (path.startsWith('/client') && userRole === 'client') {
      return [
        { label: 'New Booking', icon: Clock, href: '/booking', badge: 'Quick' },
        { label: 'Favorite Services', icon: Star, href: '/client/favorites' },
        { label: 'Profile', icon: User, href: '/client/profile' }
      ];
    }

    // Provider dashboard context
    if (path.startsWith('/provider') && userRole === 'provider') {
      return [
        { label: 'New Jobs', icon: Clock, href: '/provider/jobs', badge: 'New' },
        { label: 'Schedule', icon: Star, href: '/provider/schedule' },
        { label: 'Performance', icon: User, href: '/provider/stats' }
      ];
    }

    return [];
  }, [location.pathname, userRole]);

  if (contextualItems.length === 0) return null;

  return (
    <div className={cn("hidden lg:flex items-center space-x-2", className)}>
      {contextualItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Button
            key={item.href}
            variant="ghost"
            size="sm"
            className="h-8 px-3 gap-2 relative"
            onClick={() => window.location.href = item.href}
          >
            <IconComponent className="h-4 w-4" />
            <span className="text-sm">{item.label}</span>
            {item.badge && (
              <Badge 
                variant="secondary" 
                className="ml-1 px-1.5 py-0.5 text-xs bg-primary/10 text-primary"
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
};
