
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { VacationRequestsSection } from '@/components/admin/sections/VacationRequestsSection';
import AdminLayout from '@/components/admin/AdminLayout';

export function AdminVacationRequests() {
  useTitle('Admin - Vacation Requests');
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Vacation Requests</h1>
        </div>
        <VacationRequestsSection />
      </div>
    </AdminLayout>
  );
}
