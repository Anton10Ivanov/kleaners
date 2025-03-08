
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminBookings from './AdminBookings';
import AdminCustomers from './AdminCustomers';
import AdminProviders from './AdminProviders';
import AdminSupportQueries from './AdminSupportQueries';
import AdminSettings from './AdminSettings';
import AdminVacationRequests from './AdminVacationRequests';
import AdminAnalytics from './AdminAnalytics';

const AdminPanel = () => {
  return (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="bookings" element={<AdminBookings />} />
      <Route path="customers" element={<AdminCustomers />} />
      <Route path="providers" element={<AdminProviders />} />
      <Route path="support-queries" element={<AdminSupportQueries />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="vacation-requests" element={<AdminVacationRequests />} />
      <Route path="analytics" element={<AdminAnalytics />} />
    </Routes>
  );
};

export default AdminPanel;
