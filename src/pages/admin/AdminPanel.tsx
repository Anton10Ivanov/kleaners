
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTabs from '@/components/admin/AdminTabs';

const AdminPanel = () => {
  return (
    <AdminLayout>
      <AdminTabs />
    </AdminLayout>
  );
};

export default AdminPanel;
