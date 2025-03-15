
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ClientLayout from '@/components/client/ClientLayout';
import ClientDashboard from '@/pages/client/ClientDashboard';
import ClientBookings from '@/pages/client/ClientBookings';
import ClientMessages from '@/pages/client/ClientMessages';
import ClientInvoices from '@/pages/client/ClientInvoices';
import ClientProfile from '@/pages/client/ClientProfile';
import ClientSettings from '@/pages/client/ClientSettings';
import ProviderLayout from '@/components/provider/ProviderLayout';
import ProviderDashboard from '@/pages/provider/ProviderDashboard';
import ProviderBookings from '@/pages/provider/ProviderBookings';
import ProviderMessages from '@/pages/provider/ProviderMessages';
import ProviderProfile from '@/pages/provider/ProviderProfile';
import ProviderSettings from '@/pages/provider/ProviderSettings';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import { AdminBookings } from '@/pages/admin/AdminBookings';
import { AdminCustomers } from '@/pages/admin/AdminCustomers';
import { AdminProviders } from '@/pages/admin/AdminProviders';
import { AdminPendingBookingsPool } from './pages/admin/PendingBookingsPool';

// This component is now deprecated in favor of the routes in App.tsx
// It's kept for backward compatibility but will redirect to the main routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect all routes to their corresponding routes in App.tsx */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
