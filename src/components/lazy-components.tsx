
import { lazy } from 'react';

// Clean lazy loading without duplicates
export const LazyAdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
export const LazyBookingsSection = lazy(() => 
  import('@/components/admin/sections/BookingsSection').then(module => ({ default: module.BookingsSection }))
);
