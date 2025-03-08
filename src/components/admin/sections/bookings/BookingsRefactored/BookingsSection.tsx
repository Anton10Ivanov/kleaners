
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { BookingStatus, SortField, SortOrder } from "../types";
import { BookingsFilter } from "../BookingsFilter";
import { useBookings } from "@/hooks/useBookings";
import { useToast } from "@/hooks/use-toast";
import { BookingsContent } from "./BookingsContent";

export const BookingsSection = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger a refresh
  
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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, searchTerm, dateRange]);

  // Show error toast when there's an error fetching bookings
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
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
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
      
      <BookingsContent
        bookings={bookings}
        isLoading={isLoading}
        error={error}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortField={sortField}
        sortOrder={sortOrder}
        toggleSort={toggleSort}
        selectedStatus={selectedStatus}
        updateBookingStatus={updateBookingStatus}
        deleteBooking={deleteBooking}
        handleRefresh={handleRefresh}
        setSearchTerm={setSearchTerm}
        setSelectedStatus={setSelectedStatus}
        setDateRange={setDateRange}
      />
    </div>
  );
};
