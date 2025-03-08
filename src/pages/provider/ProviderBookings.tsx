
import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import BookingTabs from '@/components/provider/bookings/BookingTabs';
import ScheduleCard from '@/components/provider/bookings/ScheduleCard';
import { getBookingData } from '@/components/provider/bookings/bookingData';
import BookingMap from '@/components/provider/bookings/BookingMap';

const ProviderBookings = () => {
  useTitle('Provider Bookings');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
  
  // Get booking data from our utility
  const { upcomingBookings, pendingBookings, completedBookings } = getBookingData();

  // Combine all bookings for the map
  const allBookings = [...upcomingBookings, ...pendingBookings, ...completedBookings];
  
  // Prepare map locations from bookings
  const mapLocations = allBookings.map(booking => ({
    id: booking.id,
    address: booking.address,
    coordinates: booking.coordinates,
    clientName: booking.clientName,
    service: booking.service,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Your Bookings</h1>
        <p className="text-muted-foreground">Manage your cleaning assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BookingTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            upcomingBookings={upcomingBookings}
            pendingBookings={pendingBookings}
            completedBookings={completedBookings}
            selectedBookingId={selectedBookingId}
            onSelectBooking={setSelectedBookingId}
          />
          
          <BookingMap 
            locations={mapLocations}
            selectedBookingId={selectedBookingId}
            onSelectBooking={setSelectedBookingId}
          />
        </div>
        
        <div>
          <ScheduleCard date={date} onDateChange={setDate} />
        </div>
      </div>
    </div>
  );
};

export default ProviderBookings;
