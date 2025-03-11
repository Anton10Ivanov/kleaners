
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BookingList from "./BookingList";

interface BookingTabsProps {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
  upcomingBookings: any[];
  pendingBookings: any[];
  completedBookings: any[];
  selectedBookingId?: string;
  onSelectBooking?: (id: string) => void;
}

const BookingTabs = ({
  selectedTab,
  setSelectedTab,
  upcomingBookings,
  pendingBookings,
  completedBookings,
  selectedBookingId,
  onSelectBooking,
}: BookingTabsProps) => {
  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>      
      <TabsContent value="upcoming">
        <BookingList 
          bookings={upcomingBookings} 
          type="upcoming" 
          selectedBookingId={selectedBookingId}
          onSelectBooking={onSelectBooking}
        />
      </TabsContent>
      
      <TabsContent value="pending">
        <BookingList 
          bookings={pendingBookings} 
          type="pending" 
          selectedBookingId={selectedBookingId}
          onSelectBooking={onSelectBooking}
        />
      </TabsContent>
      
      <TabsContent value="completed">
        <BookingList 
          bookings={completedBookings} 
          type="completed" 
          selectedBookingId={selectedBookingId}
          onSelectBooking={onSelectBooking}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BookingTabs;
