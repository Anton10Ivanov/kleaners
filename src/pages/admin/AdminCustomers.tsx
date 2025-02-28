
import { CustomersSection } from "@/components/admin/sections/CustomersSection";

export const AdminCustomers = () => {
  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
        <CustomersSection />
      </div>
    </div>
  );
};
