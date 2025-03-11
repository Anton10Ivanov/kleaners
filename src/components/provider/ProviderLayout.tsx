
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import ProviderSidebar from "./ProviderSidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProviderBottomNav } from "./ProviderBottomNav";

const ProviderLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(() => {
    // Set page title
    document.title = "Provider Dashboard";
  }, []);

  return (
    <div className="flex h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProviderSidebar />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <ScrollArea className="h-full">
          <div className="mx-auto container max-w-6xl">
            <Outlet />
          </div>
          {/* Add padding at the bottom on mobile to account for the bottom nav */}
          {isMobile && <div className="h-16" />}
        </ScrollArea>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <ProviderBottomNav />
    </div>
  );
};

export default ProviderLayout;
