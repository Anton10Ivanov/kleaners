
import React, { useState, useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { DateRange } from 'react-day-picker';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { BookingsContent } from './BookingsContent';
import { Booking, BookingStatus } from '@/components/admin/sections/bookings/types';

export const BookingsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all' as BookingStatus | 'all',
    search: '',
    dateRange: undefined as DateRange | undefined,
  });
  
  // We need to mock these properties since they don't exist in the hook
  const [totalPages, setTotalPages] = useState(5);
  
  // Using the hook with parameters
  const {
    bookings,
    isLoading,
    error,
    updateBookingStatus,
    deleteBooking,
  } = useBookings({
    selectedStatus: filters.status === 'all' ? null : filters.status,
    searchTerm: filters.search,
    sortField: 'date',
    sortOrder: 'desc',
    dateRange: filters.dateRange,
  });

  // Mock fetchBookings function
  const fetchBookings = () => {
    console.log('Fetching bookings with filters:', filters);
  };

  // Mock assignProvider function - fixed to match expected signature
  const assignProvider = (bookingId: string, providerId: string) => {
    console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
  };

  // Fetch bookings whenever page or filters change
  useEffect(() => {
    fetchBookings();
  }, [currentPage, filters.status, filters.search, filters.dateRange]);

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
    assignProvider(bookingId, providerId);
  };

  const handleViewDetails = (booking: Booking) => {
    // View details functionality
    console.log('View details:', booking);
  };

  const handleContactClient = (booking: Booking) => {
    // Contact client functionality
    const name = `${booking.first_name || ''} ${booking.last_name || ''}`.trim();
    console.log('Contact client:', name);
  };

  if (isLoading && bookings.length === 0) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRefresh={fetchBookings} />;
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
