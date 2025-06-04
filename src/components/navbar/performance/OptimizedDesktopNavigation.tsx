
import React, { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { LazyMegaMenu } from './LazyMegaMenu';
import { EnhancedDropdownNavigation } from '../desktop/EnhancedDropdownNavigation';
import { ContextualMenus } from '../smart/ContextualMenus';
import { SearchIntegration } from '../smart/SearchIntegration';
import { navItems } from '../navigationData';
import { useAuth } from '@/hooks/useAuth';

interface OptimizedDesktopNavigationProps {
  className?: string;
}

const OptimizedDesktopNavigationComponent: React.FC<OptimizedDesktopNavigationProps> = ({
  className
}) => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();
  const { user } = useAuth();

  // Memoize user role calculation
  const userRole = useMemo(() => user?.role || null, [user?.role]);

  // Memoize navigation classes
  const navigationClasses = useMemo(() => cn(
    "hidden lg:flex items-center space-x-6",
    className
  ), [className]);

  const itemsClasses = useMemo(() => cn(
    "flex items-center",
    isMobile ? "space-x-4" : "space-x-6"
  ), [isMobile]);

  return (
    <div className={navigationClasses}>
      <div className={itemsClasses}>
        <LazyMegaMenu />
        <EnhancedDropdownNavigation navItems={navItems} />
      </div>
      
      {/* Smart navigation features */}
      <div className="flex items-center space-x-4">
        <SearchIntegration />
        <ContextualMenus userRole={userRole} />
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export const OptimizedDesktopNavigation = memo(OptimizedDesktopNavigationComponent);
