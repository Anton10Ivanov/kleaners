
import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import BookingTabs from '@/components/provider/bookings/BookingTabs';
import { getBookingData } from '@/components/provider/bookings/bookingData';

const ProviderBookings = () => {
  useTitle('Provider Bookings');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
  
  // Get booking data from our utility
  const { upcomingBookings, pendingBookings, completedBookings } = getBookingData();

  return (
    <div className="container mx-auto px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Your Bookings</h1>
        <p className="text-muted-foreground">Manage your cleaning assignments</p>
      </div>

      <div className="pt-6">
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
  );
};

export default ProviderBookings;
