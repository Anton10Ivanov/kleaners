
import { ProvidersSection } from "@/components/admin/sections/ProvidersSection";

export const AdminProviders = () => {
  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Service Provider Management</h1>
        <ProvidersSection />
      </div>
    </div>
  );
};
