
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingsSection } from "./sections/BookingsSection";
import { CustomersSection } from "./sections/CustomersSection";
import { ProvidersSection } from "./sections/ProvidersSection";
import { CalendarSection } from "./sections/CalendarSection";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * AdminTabs component handles the main navigation and content display for the admin dashboard.
 * It provides a tabbed interface for different administrative sections.
 */
export const AdminTabs = () => {
  return (
    <Tabs defaultValue="bookings" className="w-full">
      <ScrollArea className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="bookings" className="text-sm md:text-base">
            Bookings
          </TabsTrigger>
          <TabsTrigger value="customers" className="text-sm md:text-base">
            Customers
          </TabsTrigger>
          <TabsTrigger value="providers" className="text-sm md:text-base">
            Providers
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-sm md:text-base">
            Calendar
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <div className="mt-4 px-2 md:px-4">
        <TabsContent value="bookings">
          <BookingsSection />
        </TabsContent>
        <TabsContent value="customers">
          <CustomersSection />
        </TabsContent>
        <TabsContent value="providers">
          <ProvidersSection />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarSection />
        </TabsContent>
      </div>
    </Tabs>
  );
};
