
import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import BookingTabs from '@/components/provider/bookings/BookingTabs';
import ScheduleCard from '@/components/provider/bookings/ScheduleCard';
import { getBookingData } from '@/components/provider/bookings/bookingData';

const ProviderBookings = () => {
  useTitle('Provider Bookings');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get booking data from our utility
  const { upcomingBookings, pendingBookings, completedBookings } = getBookingData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Your Bookings</h1>
        <p className="text-muted-foreground">Manage your cleaning assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BookingTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            upcomingBookings={upcomingBookings}
            pendingBookings={pendingBookings}
            completedBookings={completedBookings}
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
