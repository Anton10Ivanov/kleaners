
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { BookingStatus, SortField, SortOrder } from "./bookings/types";
import { BookingsFilter } from "./bookings/BookingsFilter";
import { BookingsTable } from "./bookings/BookingsTable";
import { useBookings } from "@/hooks/useBookings";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const BookingsSection = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { 
    bookings, 
    isLoading, 
    error, 
    updateBookingStatus, 
    deleteBooking 
  } = useBookings({
    selectedStatus,
    searchTerm,
    sortField,
    sortOrder,
    dateRange,
  });

  // Show error toast when there's an error fetching bookings
  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading bookings",
      description: error.message || "Failed to load bookings. Please try again.",
    });
  }

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalItems = bookings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentBookings = bookings?.slice(startIndex, endIndex) || [];

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-md border shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-md border shadow-sm">
          <div className="text-center py-4">
            <p className="text-destructive font-medium">Failed to load bookings</p>
            <p className="text-muted-foreground text-sm mt-1">
              Please try refreshing the page
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      ) : (
        <>
          {bookings && bookings.length > 0 ? (
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
              
              <BookingsTable
                bookings={currentBookings}
                sortField={sortField}
                sortOrder={sortOrder}
                toggleSort={toggleSort}
                updateBookingStatus={(id, status) => updateBookingStatus({ id, status })}
                deleteBooking={deleteBooking}
              />
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-md border shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">No bookings found matching your filters</p>
              {(searchTerm || selectedStatus || dateRange) && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStatus(null);
                    setDateRange(undefined);
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
