
import { useQuery } from "@tanstack/react-query";
import { Booking } from "@/components/admin/sections/bookings/types";
import { isWithinInterval, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { handleApiError, ErrorSeverity } from "@/utils/errorHandling";
import { BookingsFilterParams, getBookingsQueryKey } from "./bookingsUtils";

/**
 * Custom hook for fetching bookings with filtering and sorting
 */
export const useBookingsQuery = (filterParams: BookingsFilterParams) => {
  // Query key based on current filters
  const queryKey = getBookingsQueryKey(filterParams);

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        console.log(`Fetching bookings with filters:`, filterParams);
        
        let query = supabase
          .from('bookings')
          .select('*')
          .order(filterParams.sortField, { ascending: filterParams.sortOrder === 'asc' });

        if (filterParams.selectedStatus) {
          query = query.eq('status', filterParams.selectedStatus);
        }

        if (filterParams.searchTerm) {
          query = query.or(
            `first_name.ilike.%${filterParams.searchTerm}%,` +
            `last_name.ilike.%${filterParams.searchTerm}%,` +
            `email.ilike.%${filterParams.searchTerm}%`
          );
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        if (!data) return [];

        if (filterParams.dateRange?.from && filterParams.dateRange?.to) {
          console.log(`Filtering by date range: ${filterParams.dateRange.from} to ${filterParams.dateRange.to}`);
          
          return data.filter(booking => 
            booking.date && 
            isWithinInterval(parseISO(booking.date), {
              start: filterParams.dateRange.from,
              end: filterParams.dateRange.to
            })
          ) as Booking[];
        }

        console.log(`Fetched ${data.length} bookings`);
        return data as Booking[];
      } catch (error) {
        // Use our enhanced error handling utility
        handleApiError(error, "Failed to fetch bookings", "useBookingsQuery", ErrorSeverity.ERROR);
        throw error;
      }
    },
    // Add retry logic for transient network failures
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && error.message.includes('status code 4')) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    }
  });
};
