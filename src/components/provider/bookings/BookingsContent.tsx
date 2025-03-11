
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[120px] p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-2xl font-bold">{bookingSummary.total}</div>
            </div>
            <div 
              className={`flex-1 min-w-[120px] p-4 rounded-lg ${selectedTab === 'upcoming' ? 'bg-green-50' : 'bg-gray-50'}`}
              onClick={() => setSelectedTab('upcoming')}
              style={{ cursor: 'pointer' }}
            >
              <div className="text-sm text-muted-foreground">Upcoming</div>
              <div className="text-2xl font-bold">{bookingSummary.upcoming}</div>
            </div>
            <div 
              className={`flex-1 min-w-[120px] p-4 rounded-lg ${selectedTab === 'pending' ? 'bg-amber-50' : 'bg-gray-50'}`}
              onClick={() => setSelectedTab('pending')}
              style={{ cursor: 'pointer' }}
            >
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="text-2xl font-bold">{bookingSummary.pending}</div>
            </div>
            <div 
              className={`flex-1 min-w-[120px] p-4 rounded-lg ${selectedTab === 'completed' ? 'bg-purple-50' : 'bg-gray-50'}`}
              onClick={() => setSelectedTab('completed')}
              style={{ cursor: 'pointer' }}
            >
              <div className="text-sm text-muted-foreground">Completed</div>
              <div className="text-2xl font-bold">{bookingSummary.completed}</div>
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
