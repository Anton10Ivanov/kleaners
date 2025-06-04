
import React, { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { EnhancedDropdownNavigation } from './EnhancedDropdownNavigation';
import { NavigationLoadingState } from './NavigationLoadingState';
import { navItems } from '../navigationData';
import { ErrorBoundary } from 'react-error-boundary';

const NavigationErrorFallback = () => (
  <div className="hidden lg:flex items-center space-x-6">
    <span className="text-sm text-muted-foreground">Navigation unavailable</span>
  </div>
);

export const DesktopNavigationEnhanced = () => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  return (
    <ErrorBoundary FallbackComponent={NavigationErrorFallback}>
      <div className="hidden lg:flex items-center space-x-6">
        <div className={cn(
          "flex items-center",
          isMobile ? "space-x-4" : "space-x-6"
        )}>
          <Suspense fallback={<NavigationLoadingState />}>
            <EnhancedDropdownNavigation navItems={navItems} />
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
};
