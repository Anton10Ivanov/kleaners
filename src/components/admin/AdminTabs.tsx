
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingsSection } from "./sections/BookingsSection";
import { CustomersSection } from "./sections/CustomersSection";
import { ProvidersSection } from "./sections/ProvidersSection";
import { CalendarSection } from "./sections/CalendarSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNavigate } from "react-router-dom";

/**
 * AdminTabs component handles the main navigation and content display for the admin dashboard.
 * It provides a tabbed interface for different administrative sections.
 */
export const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Smooth transition when switching tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Optionally navigate to the corresponding admin page
    // This lets both the tabs and the direct URLs work
    if (!isMobile) {
      switch (value) {
        case "bookings":
          navigate("/admin/bookings", { replace: true });
          break;
        case "customers":
          navigate("/admin/customers", { replace: true });
          break;
        case "providers":
          navigate("/admin/providers", { replace: true });
          break;
        case "calendar":
          navigate("/admin/settings", { replace: true });
          break;
      }
    }
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className="w-full transition-all duration-300 ease-in-out"
    >
      <div className="sticky top-0 z-10 bg-background pb-2">
        <ScrollArea className="w-full pb-2">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger 
              value="bookings" 
              className="text-sm md:text-base transition-all duration-200 relative"
              data-state={activeTab === "bookings" ? "active" : "inactive"}
            >
              Bookings
              {activeTab === "bookings" && (
                <span className="absolute -bottom-[2px] left-0 w-full h-[3px] bg-primary rounded-full transform scale-x-75 opacity-80" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="customers" 
              className="text-sm md:text-base transition-all duration-200 relative"
              data-state={activeTab === "customers" ? "active" : "inactive"}
            >
              Customers
              {activeTab === "customers" && (
                <span className="absolute -bottom-[2px] left-0 w-full h-[3px] bg-primary rounded-full transform scale-x-75 opacity-80" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="providers" 
              className="text-sm md:text-base transition-all duration-200 relative"
              data-state={activeTab === "providers" ? "active" : "inactive"}
            >
              Providers
              {activeTab === "providers" && (
                <span className="absolute -bottom-[2px] left-0 w-full h-[3px] bg-primary rounded-full transform scale-x-75 opacity-80" />
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="text-sm md:text-base transition-all duration-200 relative"
              data-state={activeTab === "calendar" ? "active" : "inactive"}
            >
              Calendar
              {activeTab === "calendar" && (
                <span className="absolute -bottom-[2px] left-0 w-full h-[3px] bg-primary rounded-full transform scale-x-75 opacity-80" />
              )}
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
      </div>

      <div className={`mt-4 px-2 md:px-4 transition-opacity duration-300 ease-in-out ${isMobile ? 'pt-2' : 'pt-0'}`}>
        <TabsContent 
          value="bookings"
          className="animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
        >
          <BookingsSection />
        </TabsContent>
        <TabsContent 
          value="customers"
          className="animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
        >
          <CustomersSection />
        </TabsContent>
        <TabsContent 
          value="providers"
          className="animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
        >
          <ProvidersSection />
        </TabsContent>
        <TabsContent 
          value="calendar"
          className="animate-in fade-in-50 slide-in-from-bottom-3 duration-300"
        >
          <CalendarSection />
        </TabsContent>
      </div>
    </Tabs>
  );
};
