import { lazy, ComponentType } from 'react';

// Helper function to wrap imports that might not have default exports
const lazyWithDefault = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>
): React.LazyExoticComponent<T> => {
  return lazy(() => 
    importFn().then((module) => {
      // If the module already has a default export, use it
      if ('default' in module) {
        return module as { default: T };
      }
      // Otherwise, wrap the module as the default export
      return { default: module as T };
    })
  );
};

// Lazy load admin components with proper default export handling
export const LazyAdminDashboard = lazy(() => import('@/components/admin/Dashboard').then(m => ({ default: m.Dashboard })));
export const LazyBookingsSection = lazy(() => import('@/components/admin/sections/BookingsSection').then(m => ({ default: m.default || m })));

// Export all lazy components
export {
  LazyAdminDashboard,
  LazyBookingsSection
};
