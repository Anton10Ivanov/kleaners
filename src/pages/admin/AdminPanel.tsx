
import React, { useState } from 'react';
import AdminTabs, { AdminTab } from '@/components/admin/AdminTabs';
import { useTitle } from '@/hooks/useTitle';

const AdminPanel = () => {
  useTitle("Admin Panel");
  const [activeTab, setActiveTab] = useState<AdminTab>("bookings");

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage bookings, customers, providers, and questions</p>
      </div>
      <AdminTabs activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default AdminPanel;
