
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
// Import the new pending bookings pool page
import { AdminPendingBookingsPool } from './pages/admin/PendingBookingsPool';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth">
        <Route path="login" element={<Navigate to="/auth/login" />} />
        <Route path="register" element={<Navigate to="/auth/register" />} />
        <Route path="forgot-password" element={<Navigate to="/auth/forgot-password" />} />
        <Route path="reset-password" element={<Navigate to="/auth/reset-password" />} />
      </Route>
      
      {/* Client Routes */}
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="bookings" element={<ClientBookings />} />
        <Route path="messages" element={<ClientMessages />} />
        <Route path="invoices" element={<ClientInvoices />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="settings" element={<ClientSettings />} />
      </Route>
      
      {/* Provider Routes */}
      <Route path="/provider" element={<ProviderLayout />}>
        <Route index element={<ProviderDashboard />} />
        <Route path="dashboard" element={<ProviderDashboard />} />
        <Route path="bookings" element={<ProviderBookings />} />
        <Route path="messages" element={<ProviderMessages />} />
        <Route path="profile" element={<ProviderProfile />} />
        <Route path="settings" element={<ProviderSettings />} />
        <Route path="pending-pool" element={<AdminPendingBookingsPool />} /> {/* Add pending pool access for providers */}
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="providers" element={<AdminProviders />} />
      </Route>
      
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
