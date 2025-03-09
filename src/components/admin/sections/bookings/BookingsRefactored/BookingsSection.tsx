
import React, { useState, useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { DateRange } from 'react-day-picker';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { BookingsContent } from './BookingsContent';
import { Booking, BookingStatus } from '@/components/admin/sections/bookings/types';
import { toast } from 'sonner';

export const BookingsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all' as BookingStatus | 'all',
    search: '',
    dateRange: undefined as DateRange | undefined,
  });
  
  // We need to mock these properties since they don't exist in the hook
  const [totalPages, setTotalPages] = useState(5);
  
  // Using the enhanced hook with better error handling and query invalidation
  const {
    bookings,
    isLoading,
    isFetching,
    error,
    updateBookingStatus,
    deleteBooking,
    refreshBookings,
    mutations
  } = useBookings({
    selectedStatus: filters.status === 'all' ? null : filters.status,
    searchTerm: filters.search,
    sortField: 'date',
    sortOrder: 'desc',
    dateRange: filters.dateRange,
  });

  // Mock assignProvider function
  const assignProvider = ({ bookingId, providerId }: { bookingId: string, providerId: string }) => {
    console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
    toast.success(`Provider assigned to booking`);
    
    // Refresh data after assignment
    refreshBookings();
  };

  // Log when error status changes
  useEffect(() => {
    if (error) {
      console.error('Bookings data error:', error);
    }
  }, [error]);

  // Track mutation errors to provide feedback
  useEffect(() => {
    if (mutations.updateStatus.isError) {
      console.error('Status update error:', mutations.updateStatus.error);
    }
    
    if (mutations.delete.isError) {
      console.error('Delete booking error:', mutations.delete.error);
    }
  }, [mutations.updateStatus.isError, mutations.delete.isError]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: {
    status?: BookingStatus | 'all';
    search?: string;
    dateRange?: DateRange | undefined;
  }) => {
    // Reset to first page when filters change
    setCurrentPage(1);
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
    
    console.log('Filters changed:', { ...filters, ...newFilters });
  };

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    updateBookingStatus({ id, status });
  };

  const handleDeleteBooking = (id: string) => {
    deleteBooking(id);
  };

  const handleAssignProvider = (bookingId: string, providerId: string) => {
    assignProvider({ bookingId, providerId });
  };

  const handleViewDetails = (booking: Booking) => {
    // View details functionality
    console.log('View details:', booking);
  };

  const handleContactClient = (booking: Booking) => {
    // Contact client functionality
    const clientName = `${booking.first_name || ''} ${booking.last_name || ''}`.trim();
    console.log('Contact client:', clientName);
  };

  if (isLoading && bookings.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState 
        onRefresh={refreshBookings} 
        error={error}
        title="Couldn't load bookings"
        description="There was a problem loading the booking data."
      />
    );
  }

  return (
    <BookingsContent
      bookings={bookings}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onUpdateStatus={handleUpdateStatus}
      onDeleteBooking={handleDeleteBooking}
      onAssignProvider={handleAssignProvider}
      onViewDetails={handleViewDetails}
      onContactClient={handleContactClient}
      isLoading={isLoading || isFetching}
      onFilterChange={handleFilterChange}
    />
  );
};
