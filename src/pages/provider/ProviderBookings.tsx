
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks/useTitle';
import BookingTabs from '@/components/provider/bookings/BookingTabs';
import { getBookingData } from '@/components/provider/bookings/bookingData';
import { FilterableStatsCards } from '@/components/provider/bookings/FilterableStatsCards';
import { Card } from '@/components/ui/card';
import { CalendarClock, MapPin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Your Bookings</h1>
          <p className="text-muted-foreground">Manage your cleaning assignments</p>
        </div>
      </div>

      {/* Add FilterableStatsCards component */}
      <FilterableStatsCards
        filterType={selectedTab}
        setFilterType={setSelectedTab}
        bookingSummary={bookingSummary}
      />

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
          {selectedBooking ? (
            <Card className="p-6 h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">{selectedBooking.clientName}</h3>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => setSelectedBookingId(undefined)}>
                  Close
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground">{selectedBooking.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CalendarClock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Schedule</h4>
                    <p className="text-sm">{selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : 'TBD'}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Service Details</h4>
                    <p className="text-sm">{selectedBooking.service}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.hours} hour{selectedBooking.hours !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  <Button className="w-full">Navigate to Location</Button>
                  <Button variant="outline" className="w-full">Contact Client</Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
              <Info className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Booking Details</h3>
              <p className="text-muted-foreground mb-6">Select a booking to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderBookings;
