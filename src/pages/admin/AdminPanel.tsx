
import React from 'react';
import AdminHome from './AdminHome';
import { AdminBookings } from './AdminBookings';
import { AdminCustomers } from './AdminCustomers';
import { AdminProviders } from './AdminProviders';
import { AdminSettings } from './AdminSettings';
import { AdminSupportQueries } from './AdminSupportQueries';
import AdminAnalytics from './AdminAnalytics';
import { AdminVacationRequests } from './AdminVacationRequests';
import { Route, Routes, Navigate } from 'react-router-dom';

/**
 * Main admin panel component that handles routing between different admin pages
 * @returns Admin panel component with child routes
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
      <Route path="/vacation-requests" element={<AdminVacationRequests />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminPanel;
