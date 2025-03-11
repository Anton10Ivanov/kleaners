
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
  bookingSummary: {
    total: number;
    upcoming: number;
    pending: number;
    completed: number;
  };
}

const BookingsContent = ({
  selectedTab,
  setSelectedTab,
  upcomingBookings,
  pendingBookings,
  completedBookings,
  selectedBookingId,
  setSelectedBookingId,
  selectedBooking,
  bookingSummary
}: BookingsContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
            <div className="p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-xs md:text-sm text-muted-foreground">Total</div>
              <div className="text-xl md:text-2xl font-bold">{bookingSummary.total}</div>
            </div>
            <div 
              className={`p-3 md:p-4 rounded-lg cursor-pointer ${selectedTab === 'upcoming' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
              onClick={() => setSelectedTab('upcoming')}
            >
              <div className="text-xs md:text-sm text-muted-foreground">Upcoming</div>
              <div className="text-xl md:text-2xl font-bold">{bookingSummary.upcoming}</div>
            </div>
            <div 
              className={`p-3 md:p-4 rounded-lg cursor-pointer ${selectedTab === 'pending' ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
              onClick={() => setSelectedTab('pending')}
            >
              <div className="text-xs md:text-sm text-muted-foreground">Pending</div>
              <div className="text-xl md:text-2xl font-bold">{bookingSummary.pending}</div>
            </div>
            <div 
              className={`p-3 md:p-4 rounded-lg cursor-pointer ${selectedTab === 'completed' ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}
              onClick={() => setSelectedTab('completed')}
            >
              <div className="text-xs md:text-sm text-muted-foreground">Completed</div>
              <div className="text-xl md:text-2xl font-bold">{bookingSummary.completed}</div>
            </div>
          </div>
          
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
