
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs, { AdminTab } from '@/components/admin/AdminTabs';
import { useTitle } from '@/hooks/useTitle';

const AdminPanel = () => {
  useTitle("Admin Panel");
  const [activeTab, setActiveTab] = useState<AdminTab>("bookings");

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <AdminHeader
          userName="Admin User"
          onSearch={() => {}}
          onNotificationsClick={() => {}}
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage bookings, customers, providers, and questions</p>
        </div>
        <AdminTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
