
import BookingTabs from "@/components/provider/bookings/BookingTabs";
import BookingDetailsCard from "@/components/provider/bookings/BookingDetailsCard";

interface BookingsContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  upcomingBookings: any[];
  pendingBookings: any[];
  completedBookings: any[];
  selectedBookingId: string | undefined;
  setSelectedBookingId: (id: string | undefined) => void;
  selectedBooking: any | null;
}

const BookingsContent = ({
  selectedTab,
  setSelectedTab,
  upcomingBookings,
  pendingBookings,
  completedBookings,
  selectedBookingId,
  setSelectedBookingId,
  selectedBooking
}: BookingsContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <BookingTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            upcomingBookings={upcomingBookings}
            pendingBookings={pendingBookings}
            completedBookings={completedBookings}
            selectedBookingId={selectedBookingId}
            onSelectBooking={setSelectedBookingId}
          />
        </div>
      </div>

      <div className="md:col-span-1">
        <BookingDetailsCard 
          selectedBooking={selectedBooking} 
          onClose={() => setSelectedBookingId(undefined)} 
        />
      </div>
    </div>
  );
};

export default BookingsContent;
