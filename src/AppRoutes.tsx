import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout } from '@/components/auth/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
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
import { Customers } from '@/pages/admin/Customers';
import { Providers } from '@/pages/admin/Providers';
// Import the new pending bookings pool page
import { AdminPendingBookingsPool } from './pages/admin/PendingBookingsPool';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
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
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
        <Route path="customers" element={<Customers />} />
        <Route path="providers" element={<Providers />} />
      </Route>
      
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
