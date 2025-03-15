
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { BookingStatus, SortField, SortOrder } from "./bookings/types";
import { BookingsFilter } from "./bookings/BookingsFilter";
import { BookingsTable } from "./bookings/BookingsTable";
import { useBookings } from "@/hooks/useBookings";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BookingsPagination } from "./bookings/components/BookingsPagination";
import { BookingsLoadingState } from "./bookings/components/BookingsLoadingState";
import { BookingsErrorState } from "./bookings/components/BookingsErrorState";
import { BookingsEmptyState } from "./bookings/components/BookingsEmptyState";
import { BookingsStatusBadge } from "./bookings/components/BookingsStatusBadge";

export const BookingsSection = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger a refresh
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const itemsPerPage = isMobile ? 5 : 10;

  const { 
    bookings, 
    isLoading, 
    error, 
    updateBookingStatus, 
    deleteBooking 
  } = useBookings({
    selectedStatus: selectedStatus === "all" ? null : selectedStatus,
    searchTerm,
    sortField,
    sortOrder,
    dateRange,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchTerm, dateRange]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading bookings",
        description: error.message || "Failed to load bookings. Please try again.",
      });
    }
  }, [error, toast]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleViewDetails = (booking) => {
    console.log("View details:", booking);
  };

  const handleContactClient = (booking) => {
    console.log("Contact client:", booking);
  };

  const totalItems = bookings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentBookings = bookings?.slice(startIndex, endIndex) || [];

  const handleStatusChange = (status: BookingStatus | 'all') => {
    setSelectedStatus(status);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setDateRange(undefined);
  };

  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    updateBookingStatus({ id, status });
  };

  if (isLoading) {
    return <BookingsLoadingState />;
  }

  if (error) {
    return <BookingsErrorState error={error} onRefresh={handleRefresh} />;
  }

  return (
    <div className="space-y-4">
      <BookingsFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        selectedDateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      
      {bookings && bookings.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">{endIndex}</span> of{" "}
              <span className="font-medium">{totalItems}</span> bookings
            </p>
            {selectedStatus !== "all" && (
              <BookingsStatusBadge 
                status={selectedStatus} 
                count={totalItems} 
              />
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-md border shadow-sm overflow-hidden">
            <BookingsTable
              bookings={currentBookings}
              sortField={sortField}
              sortOrder={sortOrder}
              toggleSort={toggleSort}
              updateBookingStatus={handleUpdateStatus}
              deleteBooking={deleteBooking}
              refreshData={handleRefresh}
              viewDetails={handleViewDetails}
              contactClient={handleContactClient}
            />
          </div>
          
          {totalPages > 1 && (
            <BookingsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={totalItems}
              isMobile={isMobile}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <BookingsEmptyState
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          dateRange={dateRange}
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  );
};
