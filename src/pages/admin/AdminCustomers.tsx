
import { useMediaQuery } from "@/hooks/use-media-query";
import { ClientsSection } from "@/components/admin";

export const AdminCustomers = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="container mx-auto py-2 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6">
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 md:mb-6`}>Client Management</h1>
        <ClientsSection />
      </div>
    </div>
  );
};
