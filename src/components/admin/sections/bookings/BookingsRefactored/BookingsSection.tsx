
import React, { useState, useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Booking, BookingStatus } from '@/types/bookings';
import { DateRange } from 'react-day-picker';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { BookingsContent } from './BookingsContent';

export const BookingsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all' as BookingStatus | 'all',
    search: '',
    dateRange: undefined as DateRange | undefined,
  });
  
  const {
    bookings,
    totalPages,
    isLoading,
    error,
    updateBookingStatus,
    deleteBooking,
    assignProvider,
    fetchBookings,
  } = useBookings(currentPage, 10, filters.status, filters.search, filters.dateRange);

  // Fetch bookings whenever page or filters change
  useEffect(() => {
    fetchBookings();
  }, [currentPage, filters.status, filters.search, filters.dateRange, fetchBookings]);

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
    console.log('Contact client:', booking.clientName);
  };

  if (isLoading && bookings.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchBookings} />;
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
      isLoading={isLoading}
      onFilterChange={handleFilterChange}
    />
  );
};
