
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import RootLayout from '@/components/RootLayout';
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
import ProviderAvailability from '@/pages/provider/ProviderAvailability';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import { AdminBookings } from '@/pages/admin/AdminBookings';
import { AdminCustomers } from '@/pages/admin/AdminCustomers';
import { AdminProviders } from '@/pages/admin/AdminProviders';
import { AdminPendingBookingsPool } from './pages/admin/PendingBookingsPool';
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import VerifyProvider from '@/pages/auth/VerifyProvider';
import Index from '@/pages/Index';
import Contact from '@/pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes wrapped in RootLayout */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      
      {/* Auth Routes - Standardized under /auth path */}
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-provider" element={<VerifyProvider />} />
      </Route>
      
      {/* Client Routes */}
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="bookings" element={<ClientBookings />} />
        <Route path="messages" element={<ClientMessages />} />
        <Route path="invoices" element={<ClientInvoices />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="settings" element={<ClientSettings />} />
      </Route>
      
      {/* Provider Routes */}
      <Route path="/provider" element={<ProviderLayout />}>
        <Route index element={<ProviderDashboard />} />
        <Route path="bookings" element={<ProviderBookings />} />
        <Route path="messages" element={<ProviderMessages />} />
        <Route path="availability" element={<ProviderAvailability />} />
        <Route path="profile" element={<ProviderProfile />} />
        <Route path="settings" element={<ProviderSettings />} />
        <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="providers" element={<AdminProviders />} />
      </Route>
      
      {/* Redirect legacy routes */}
      <Route path="/auth/signup" element={<Navigate to="/auth/register" replace />} />
      
      {/* Default Route - Redirects to login */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
