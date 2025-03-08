
import React, { useState } from 'react';
import { BookingsTable } from '../../bookings/BookingsTable';
import { BookingsFilter } from '../../bookings/BookingsFilter';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { DateRange } from 'react-day-picker';
import { Booking, BookingStatus } from '@/components/admin/sections/bookings/types';
import { useMediaQuery } from '@/hooks/use-media-query';

interface BookingsContentProps {
  bookings: Booking[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onDeleteBooking: (id: string) => void;
  onAssignProvider: (bookingId: string, providerId: string) => void;
  onViewDetails: (booking: Booking) => void;
  onContactClient: (booking: Booking) => void;
  isLoading: boolean;
  onFilterChange: (filters: {
    status?: BookingStatus | 'all';
    search?: string;
    dateRange?: DateRange | undefined;
  }) => void;
}

export const BookingsContent: React.FC<BookingsContentProps> = ({
  bookings,
  currentPage,
  totalPages,
  onPageChange,
  onUpdateStatus,
  onDeleteBooking,
  onAssignProvider,
  onViewDetails,
  onContactClient,
  isLoading,
  onFilterChange,
}) => {
  const [status, setStatus] = useState<BookingStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleStatusChange = (newStatus: BookingStatus | 'all') => {
    setStatus(newStatus);
    onFilterChange({
      status: newStatus,
      search: searchTerm,
      dateRange: dateRange
    });
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    onFilterChange({
      status,
      search,
      dateRange
    });
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFilterChange({
      status,
      search: searchTerm,
      dateRange: range
    });
  };

  const hasFilters = status !== 'all' || searchTerm !== '' || dateRange !== undefined;
  
  const handleClearFilters = () => {
    setStatus('all');
    setSearchTerm('');
    setDateRange(undefined);
    onFilterChange({
      status: 'all',
      search: '',
      dateRange: undefined
    });
  };

  if (bookings.length === 0 && !isLoading) {
    return <EmptyState hasFilters={hasFilters} onClearFilters={handleClearFilters} />;
  }

  // Mock function for refreshData
  const refreshData = () => {
    console.log('Refreshing data...');
  };

  return (
    <div className="space-y-4">
      <BookingsFilter
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
        onDateRangeChange={handleDateRangeChange}
        selectedStatus={status}
        searchTerm={searchTerm}
        selectedDateRange={dateRange}
      />
      
      <div className="border rounded-md overflow-hidden">
        <BookingsTable
          bookings={bookings}
          sortField="date"
          sortOrder="desc"
          toggleSort={() => {}} 
          updateBookingStatus={onUpdateStatus}
          deleteBooking={onDeleteBooking}
          refreshData={refreshData}
          assignProvider={onAssignProvider}
          viewDetails={onViewDetails}
          contactClient={onContactClient}
        />
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={onPageChange}
          isMobile={isMobile}
          startIndex={(currentPage - 1) * 10 + 1}
          endIndex={Math.min(currentPage * 10, bookings.length)}
          totalItems={bookings.length}
        />
      )}
    </div>
  );
};
