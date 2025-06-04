
import React, { lazy, Suspense } from 'react';
import { MegaMenuLoadingState } from '../desktop/NavigationLoadingState';

// Lazy load the mega menu for better initial bundle size
const DesktopMegaMenu = lazy(() => 
  import('../desktop/DesktopMegaMenu').then(module => ({
    default: module.DesktopMegaMenu
  }))
);

export const LazyMegaMenu: React.FC = () => {
  return (
    <Suspense fallback={<MegaMenuLoadingState />}>
      <DesktopMegaMenu />
    </Suspense>
  );
};
