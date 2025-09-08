
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { getBookingData } from '@/components/provider/bookings/bookingData';
import BookingsHeader from '@/components/provider/bookings/BookingsHeader';
import { ProviderDataTableOptimized as ProviderDataTable } from '@/components/provider/ProviderDataTableOptimized';

const ProviderBookings = () => {
  useTitle('Provider Bookings');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
  
  // Get booking data from our utility
  const { upcomingBookings, pendingBookings, completedBookings } = getBookingData();

  // Summary data for the stats cards
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
    <div className="form-spacing-relaxed md:form-spacing-loose pb-16 md:pb-0 animate-fadeIn">
      <BookingsHeader 
        title="Your Bookings" 
        subtitle="Manage your cleaning assignments" 
      />

      {/* Main Content with integrated stats */}
      <ProviderDataTable
        data={selectedTab === 'upcoming' ? upcomingBookings : 
              selectedTab === 'pending' ? pendingBookings : 
              completedBookings}
        columns={[
          { key: 'id', label: 'ID', sortable: true },
          { key: 'clientName', label: 'Client', sortable: true },
          { key: 'service', label: 'Service', sortable: true },
          { key: 'date', label: 'Date', sortable: true },
          { key: 'time', label: 'Time', sortable: true },
          { key: 'status', label: 'Status', sortable: true, render: (value) => (
            <span className={`px-2 py-1 rounded-full text-xs ${
              value === 'confirmed' ? 'bg-green-100 text-green-800' :
              value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              value === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {value}
            </span>
          )},
          { key: 'price', label: 'Price', sortable: true, render: (value) => `$${value}` }
        ]}
        actions={[
          { label: 'View', icon: '👁️', onClick: (row) => setSelectedBookingId(row.id) },
          { label: 'Edit', icon: '✏️', onClick: (row) => console.log('Edit', row) }
        ]}
        title={`${selectedTab === 'upcoming' ? 'Upcoming' : 
                selectedTab === 'pending' ? 'Pending' : 
                'Completed'} Bookings`}
        type="bookings"
        searchable={true}
        filterable={true}
        pagination={true}
        pageSize={10}
      />
    </div>
  );
};

export default ProviderBookings;
