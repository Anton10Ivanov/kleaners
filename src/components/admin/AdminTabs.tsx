
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingsSection } from "./sections/BookingsSection";
import { CustomersSection } from "./sections/CustomersSection";
import { ProvidersSection } from "./sections/ProvidersSection";
import { CalendarSection } from "./sections/CalendarSection";

export const AdminTabs = () => {
  return (
    <Tabs defaultValue="bookings" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="providers">Providers</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
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
    </Tabs>
  );
};
