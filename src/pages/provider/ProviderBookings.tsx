
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { getBookingData } from '@/components/provider/bookings/bookingData';
import { FilterableStatsCards } from '@/components/provider/bookings/FilterableStatsCards';
import BookingsHeader from '@/components/provider/bookings/BookingsHeader';
import BookingsContent from '@/components/provider/bookings/BookingsContent';

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

  // Get the selected booking details
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  useEffect(() => {
    if (selectedBookingId) {
      const booking = [...upcomingBookings, ...pendingBookings, ...completedBookings]
        .find(b => b.id === selectedBookingId);
      setSelectedBooking(booking || null);
    } else {
      setSelectedBooking(null);
    }
  }, [selectedBookingId, upcomingBookings, pendingBookings, completedBookings]);

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
      <BookingsHeader 
        title="Your Bookings" 
        subtitle="Manage your cleaning assignments" 
      />

      {/* Stats Cards */}
      <FilterableStatsCards
        filterType={selectedTab}
        setFilterType={setSelectedTab}
        bookingSummary={bookingSummary}
      />

      {/* Main Content */}
      <BookingsContent 
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        upcomingBookings={upcomingBookings}
        pendingBookings={pendingBookings}
        completedBookings={completedBookings}
        selectedBookingId={selectedBookingId}
        setSelectedBookingId={setSelectedBookingId}
        selectedBooking={selectedBooking}
      />
    </div>
  );
};

export default ProviderBookings;
