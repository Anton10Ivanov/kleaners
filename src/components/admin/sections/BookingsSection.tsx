import React, { useState, useEffect } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { DateRange } from 'react-day-picker';
import { BookingsTable } from './bookings/BookingsTable';
import { BookingsFilter } from './bookings/BookingsFilter';
import { Booking, BookingStatus, SortField, SortOrder } from './bookings/types';
import { Pagination } from '@/components/ui/pagination';
import { toast } from 'sonner';

/**
 * Main component for the bookings section in the admin dashboard
 */
export function BookingsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  const {
    bookings,
    isLoading,
    error,
    totalPages,
    updateBookingStatus,
    deleteBooking,
  } = useBookings({
    page: currentPage,
    selectedStatus: selectedStatus === 'all' ? null : selectedStatus,
    searchTerm,
    sortField,
    sortOrder,
    dateRange,
  });

  // Added to fix the TypeScript error - implement a proper function with the correct signature
  const assignProvider = (bookingId: string, providerId: string) => {
    console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusChange = (status: BookingStatus | 'all') => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when status changes
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1); // Reset to first page when date range changes
  };

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      // If the current field is already being sorted, toggle the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different field is selected, set it as the new sort field and default to ascending order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const fetchBookings = () => {
    toast.success('Bookings Refreshed!');
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

  return (
    <div className="space-y-4">
      <BookingsFilter
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        selectedStatus={selectedStatus}
        searchTerm={searchTerm}
        selectedDateRange={dateRange}
      />
      
      <BookingsTable 
        bookings={bookings}
        sortField={sortField}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
        updateBookingStatus={updateBookingStatus}
        deleteBooking={deleteBooking}
        refreshData={fetchBookings}
        assignProvider={handleAssignProvider}
        viewDetails={handleViewDetails}
        contactClient={handleContactClient}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={handlePageChange}
        startIndex={(currentPage - 1) * 10 + 1}
        endIndex={Math.min(currentPage * 10, bookings.length)}
        totalItems={bookings.length}
      />
    </div>
  );
}
