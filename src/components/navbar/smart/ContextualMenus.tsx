
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Star, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavbarButton, NavbarBadge } from '../core/NavbarPrimitives';
import { getNavbarIconClasses, navbarResponsive } from '../utils/styleHelpers';

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
    <div className={cn(navbarResponsive.desktopOnly, "items-center space-x-2", className)}>
      {contextualItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavbarButton
            key={item.href}
            variant="contextual"
            size="sm"
            className="relative"
            onClick={() => window.location.href = item.href}
          >
            <IconComponent className={getNavbarIconClasses('sm')} />
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <NavbarBadge 
                variant={item.badge === 'Hot' ? 'hot' : item.badge === 'New' ? 'new' : 'primary'}
                className="ml-1"
              >
                {item.badge}
              </NavbarBadge>
            )}
          </NavbarButton>
        );
      })}
    </div>
  );
};
