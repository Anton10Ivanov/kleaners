
import React from 'react';
import AdminTabs, { AdminTab } from '@/components/admin/AdminTabs';
import { useTitle } from '@/hooks/useTitle';
import { Outlet } from 'react-router-dom';

const AdminPanel = () => {
  useTitle("Admin Panel");

  return (
    <div className="w-full h-full overflow-auto">
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage bookings, customers, providers, and questions</p>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
