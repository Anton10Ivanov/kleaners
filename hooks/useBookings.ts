
import { useQueryClient } from "@tanstack/react-query";
import { BookingStatus, SortField, SortOrder } from "@/components/admin/sections/bookings/types";
import { DateRange } from "react-day-picker";
import { useBookingsQuery } from "./bookings/useBookingsQuery";
import { useBookingsMutations } from "./bookings/useBookingsMutations";
import { BookingsFilterParams } from "./bookings/bookingsUtils";
import { logInfo } from '@/utils/console-cleanup';

interface UseBookingsProps {
  selectedStatus: BookingStatus | null;
  searchTerm: string;
  sortField: SortField;
  sortOrder: SortOrder;
  dateRange: DateRange | undefined;
}

export const useBookings = ({
  selectedStatus,
  searchTerm,
  sortField,
  sortOrder,
  dateRange,
}: UseBookingsProps) => {
  const queryClient = useQueryClient();
  
  // Current filters for this hook instance
  const currentFilters: BookingsFilterParams = { 
    selectedStatus, 
    searchTerm, 
    sortField, 
    sortOrder, 
    dateRange 
  };
  
  // Get query data
  const bookingsQuery = useBookingsQuery(currentFilters);
  
  // Get mutations
  const { updateBookingStatus, deleteBooking } = useBookingsMutations(currentFilters);

  // Helper to refresh data with current filters
  const refreshBookings = () => {
    logInfo("Manually refreshing bookings data", {}, "useBookings");
    // Fix the build error by using the query key from the useBookingsQuery hook
    return queryClient.invalidateQueries({ 
      queryKey: getBookingsQueryKey(currentFilters) 
    });
  };

  return {
    bookings: bookingsQuery.data || [],
    isLoading: bookingsQuery.isLoading,
    isFetching: bookingsQuery.isFetching,
    error: bookingsQuery.error as Error | null,
    updateBookingStatus: updateBookingStatus.mutate,
    deleteBooking: deleteBooking.mutate,
    refreshBookings,
    // Expose mutation states for UI feedback
    mutations: {
      updateStatus: {
        isLoading: updateBookingStatus.isPending,
        isError: updateBookingStatus.isError,
        error: updateBookingStatus.error
      },
      delete: {
        isLoading: deleteBooking.isPending,
        isError: deleteBooking.isError,
        error: deleteBooking.error
      }
    }
  };
};

// Import the utility needed for the refreshBookings function
import { getBookingsQueryKey } from './bookings/bookingsUtils';
