
import { useMediaQuery } from "@/hooks/use-media-query";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingStatus, SortField, SortOrder, Booking } from "../types";
import { DateRange } from "react-day-picker";
import { BookingsTable } from "../BookingsTable";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface BookingsContentProps {
  bookings: Booking[] | null;
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
  selectedStatus: BookingStatus | null;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  handleRefresh: () => void;
  setSearchTerm: (term: string) => void;
  setSelectedStatus: (status: BookingStatus | null) => void;
  setDateRange: (range: DateRange | undefined) => void;
}

export const BookingsContent = ({
  bookings,
  isLoading,
  error,
  currentPage,
  setCurrentPage,
  sortField,
  sortOrder,
  toggleSort,
  selectedStatus,
  updateBookingStatus,
  deleteBooking,
  handleRefresh,
  setSearchTerm,
  setSelectedStatus,
  setDateRange
}: BookingsContentProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerPage = isMobile ? 5 : 10;

  // Calculate pagination
  const totalItems = bookings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentBookings = bookings?.slice(startIndex, endIndex) || [];

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRefresh={handleRefresh} />;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <EmptyState 
        hasFilters={!!(searchTerm || selectedStatus || dateRange)}
        onClearFilters={() => {
          setSearchTerm("");
          setSelectedStatus(null);
          setDateRange(undefined);
        }}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalItems}</span> bookings
        </p>
        {selectedStatus && (
          <div className="text-sm font-medium">
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">
              {totalItems} {selectedStatus} {totalItems === 1 ? "booking" : "bookings"}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-md border shadow-sm overflow-hidden">
        <BookingsTable
          bookings={currentBookings}
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          updateBookingStatus={updateBookingStatus}
          deleteBooking={deleteBooking}
          refreshData={handleRefresh}
        />
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          isMobile={isMobile}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
        />
      )}
    </>
  );
};
