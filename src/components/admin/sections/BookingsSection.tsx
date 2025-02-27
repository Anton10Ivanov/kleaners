
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { BookingStatus, SortField, SortOrder } from "./bookings/types";
import { BookingsFilter } from "./bookings/BookingsFilter";
import { BookingsTable } from "./bookings/BookingsTable";
import { useBookings } from "@/hooks/useBookings";

export const BookingsSection = () => {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { bookings, isLoading, updateBookingStatus, deleteBooking } = useBookings({
    selectedStatus,
    searchTerm,
    sortField,
    sortOrder,
    dateRange,
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading bookings...</div>;
  }

  return (
    <div className="space-y-4">
      <BookingsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      {bookings && bookings.length > 0 ? (
        <BookingsTable
          bookings={bookings}
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          updateBookingStatus={(id, status) => updateBookingStatus({ id, status })}
          deleteBooking={deleteBooking}
        />
      ) : (
        <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-md border shadow-sm">
          <p className="text-gray-500 dark:text-gray-400">No bookings found matching your filters</p>
        </div>
      )}
    </div>
  );
};
