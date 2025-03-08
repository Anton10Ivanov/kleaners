
import React from 'react';
import { VacationRequestsSection } from '@/components/admin/sections/VacationRequestsSection';

const AdminVacationRequests = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Provider Vacation Requests</h1>
      <VacationRequestsSection />
    </div>
  );
};

export default AdminVacationRequests;
