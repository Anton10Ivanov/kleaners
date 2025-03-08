
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks/useTitle';
import BookingTabs from '@/components/provider/bookings/BookingTabs';
import { getBookingData } from '@/components/provider/bookings/bookingData';
import { FilterableStatsCards } from '@/components/provider/bookings/FilterableStatsCards';

const ProviderBookings = () => {
  useTitle('Provider Bookings');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
  
  // Get booking data from our utility
  const { upcomingBookings, pendingBookings, completedBookings } = getBookingData();

  // Summary data for the filterable stats cards
  const [bookingSummary, setBookingSummary] = useState({
    total: 0,
    upcoming: 0,
    pending: 0,
    completed: 0
  });

  // Calculate booking summary
  useEffect(() => {
    setBookingSummary({
      total: upcomingBookings.length + pendingBookings.length + completedBookings.length,
      upcoming: upcomingBookings.length,
      pending: pendingBookings.length,
      completed: completedBookings.length
    });
  }, [upcomingBookings, pendingBookings, completedBookings]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Your Bookings</h1>
        <p className="text-muted-foreground">Manage your cleaning assignments</p>
      </div>

      {/* Add FilterableStatsCards component */}
      <div className="mt-6">
        <FilterableStatsCards
          filterType={selectedTab}
          setFilterType={setSelectedTab}
          bookingSummary={bookingSummary}
        />
      </div>

      <div className="pt-2">
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
