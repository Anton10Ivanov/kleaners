
import React, { lazy, Suspense } from 'react';
import { MegaMenuLoadingState } from '../desktop/NavigationLoadingState';

// Lazy load the enhanced dropdown navigation instead
const EnhancedDropdownNavigation = lazy(() => 
  import('../desktop/EnhancedDropdownNavigation').then(module => ({
    default: module.EnhancedDropdownNavigation
  }))
);

export const LazyMegaMenu: React.FC = () => {
  return (
    <Suspense fallback={<MegaMenuLoadingState />}>
      <EnhancedDropdownNavigation navItems={[]} />
    </Suspense>
  );
};
