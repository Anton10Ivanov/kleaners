
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationData } from './navigationData';
import { useMediaQuery } from '@/hooks/use-media-query';

export const NavigationMenu = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  if (isMobile) {
    // We'll just return null since MobileMenu.tsx handles mobile nav
    return null;
  }
  
  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
      {navigationData.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
            "font-medium"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
