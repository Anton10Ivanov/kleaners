
import { Dashboard } from "@/components/admin/Dashboard";

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
        <Dashboard />
      </div>
    </div>
  );
};
