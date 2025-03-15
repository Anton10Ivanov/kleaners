
import React, { useState, useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { DateRange } from 'react-day-picker';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { BookingsContent } from './BookingsContent';
import { Booking, BookingStatus } from '@/components/admin/sections/bookings/types';
import { BookingStatus as AppBookingStatus } from '@/types/enums'; 
import { toast } from 'sonner';
import { AssignProviderDialog } from '../AssignProviderDialog';

export const BookingsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'all' as BookingStatus | 'all',
    search: '',
    dateRange: undefined as DateRange | undefined,
  });
  
  // We need to mock these properties since they don't exist in the hook
  const [totalPages, setTotalPages] = useState(5);
  
  // State for managing the assign provider dialog
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
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

  // Update the handler to fix the type error
  const handleAssignProvider = (bookingId: string, providerId: string) => {
    console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
    
    // Close assign dialog
    setIsAssignDialogOpen(false);
    setSelectedBooking(null);
    
    // Update booking status to assigned
    updateBookingStatus({ 
      id: bookingId, 
      status: AppBookingStatus.Assigned 
    });
    
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

  const handleAssignProviderClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
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
    <>
      <BookingsContent
        bookings={bookings}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onUpdateStatus={handleUpdateStatus}
        onDeleteBooking={handleDeleteBooking}
        onAssignProvider={handleAssignProviderClick}
        onViewDetails={handleViewDetails}
        onContactClient={handleContactClient}
        isLoading={isLoading || isFetching}
        onFilterChange={handleFilterChange}
      />
      
      {selectedBooking && (
        <AssignProviderDialog
          open={isAssignDialogOpen}
          onClose={() => setIsAssignDialogOpen(false)}
          booking={selectedBooking}
          onAssign={({ bookingId, providerId }) => handleAssignProvider(bookingId, providerId)}
        />
      )}
    </>
  );
};
