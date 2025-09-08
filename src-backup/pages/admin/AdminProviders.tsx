
import { useMediaQuery } from "@/hooks/use-media-query";
import { ProvidersSection } from "@/components/admin";

export const AdminProviders = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="container mx-auto section-spacing-xs px-2 md:section-spacing-md md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg card-spacing-xs md:card-spacing-md">
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 md:mb-6`}>Service Provider Management</h1>
        <ProvidersSection />
      </div>
    </div>
  );
};
