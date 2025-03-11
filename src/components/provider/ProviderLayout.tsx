
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProviderBottomNav } from "./ProviderBottomNav";
import { TopNav } from "./TopNav";

const ProviderLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(() => {
    document.title = "Provider Dashboard";
  }, []);

  return (
    <div className="flex h-full min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top navigation for desktop */}
      <TopNav />
      
      <main className="flex-1 overflow-auto p-3 md:p-6">
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
