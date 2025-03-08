
import React, { useState } from 'react';
import { Booking, BookingStatus } from '@/types/bookings';
import { BookingsTable } from '../../bookings/BookingsTable';
import { BookingsFilter } from '../../bookings/BookingsFilter';
import { EmptyState } from './EmptyState';
import { Pagination } from './Pagination';
import { DateRange } from 'react-day-picker';

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

  const handleFilterChange = () => {
    onFilterChange({
      status,
      search: searchTerm,
      dateRange: dateRange
    });
  };

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

  if (bookings.length === 0 && !isLoading) {
    return <EmptyState onFilterChange={handleFilterChange} />;
  }

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
      
      <BookingsTable
        bookings={bookings}
        onUpdateStatus={onUpdateStatus}
        onDeleteBooking={onDeleteBooking}
        onAssignProvider={onAssignProvider}
        onViewDetails={onViewDetails}
        onContactClient={onContactClient}
      />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
