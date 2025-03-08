
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHome from './AdminHome';
import { AdminBookings } from './AdminBookings';
import { AdminCustomers } from './AdminCustomers';
import { AdminProviders } from './AdminProviders';
import { AdminSettings } from './AdminSettings';
import { AdminSupportQueries } from './AdminSupportQueries';
import AdminAnalytics from './AdminAnalytics';
import { Route, Routes, Navigate } from 'react-router-dom';

/**
 * Admin Panel component that serves as the container for all admin pages
 * and handles routing between them.
 */
const AdminPanel = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/analytics" element={<AdminAnalytics />} />
      <Route path="/bookings" element={<AdminBookings />} />
      <Route path="/customers" element={<AdminCustomers />} />
      <Route path="/providers" element={<AdminProviders />} />
      <Route path="/support-queries" element={<AdminSupportQueries />} />
      <Route path="/settings" element={<AdminSettings />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminPanel;
