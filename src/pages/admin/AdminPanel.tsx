
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
        <AdminHeader title="Admin Panel" description="Manage bookings, customers, providers, and questions" />
        <AdminTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
