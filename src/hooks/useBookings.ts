
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingStatus, SortField, SortOrder, Booking } from "@/components/admin/sections/bookings/types";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { handleApiError } from "@/utils/errorHandling";

interface UseBookingsProps {
  selectedStatus: BookingStatus | null;
  searchTerm: string;
  sortField: SortField;
  sortOrder: SortOrder;
  dateRange: DateRange | undefined;
}

// Generate a consistent query key factory to ensure proper cache invalidation
const getBookingsQueryKey = (filters?: Partial<UseBookingsProps>) => {
  const baseKey = ['admin-bookings'];
  if (!filters) return baseKey;
  
  // Build array of filter values in consistent order
  return [
    ...baseKey,
    filters.selectedStatus || null,
    filters.searchTerm || '',
    filters.sortField || 'date',
    filters.sortOrder || 'desc',
    // Convert date range to string to ensure consistent cache keys
    filters.dateRange ? `${filters.dateRange.from?.toISOString()}-${filters.dateRange.to?.toISOString()}` : null
  ];
};

export const useBookings = ({
  selectedStatus,
  searchTerm,
  sortField,
  sortOrder,
  dateRange,
}: UseBookingsProps) => {
  const queryClient = useQueryClient();
  
  // Current filters for this hook instance
  const currentFilters = { selectedStatus, searchTerm, sortField, sortOrder, dateRange };
  
  // Query key based on current filters
  const queryKey = getBookingsQueryKey(currentFilters);

  const bookingsQuery = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        console.log(`Fetching bookings with filters:`, currentFilters);
        
        let query = supabase
          .from('bookings')
          .select('*')
          .order(sortField, { ascending: sortOrder === 'asc' });

        if (selectedStatus) {
          query = query.eq('status', selectedStatus);
        }

        if (searchTerm) {
          query = query.or(
            `first_name.ilike.%${searchTerm}%,` +
            `last_name.ilike.%${searchTerm}%,` +
            `email.ilike.%${searchTerm}%`
          );
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        if (!data) return [];

        if (dateRange?.from && dateRange?.to) {
          console.log(`Filtering by date range: ${dateRange.from} to ${dateRange.to}`);
          
          return data.filter(booking => 
            booking.date && 
            isWithinInterval(parseISO(booking.date), {
              start: dateRange.from,
              end: dateRange.to
            })
          ) as Booking[];
        }

        console.log(`Fetched ${data.length} bookings`);
        return data as Booking[];
      } catch (error) {
        // Use our enhanced error handling utility
        handleApiError(error, "Failed to fetch bookings", "useBookings.bookingsQuery", "high");
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

  // Update booking status with improved error handling and precise invalidation
  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      console.log(`Updating booking ${id} status to ${status}`);
      
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data?.[0] as Booking;
    },
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot the previous value
      const previousBookings = queryClient.getQueryData<Booking[]>(queryKey);
      
      // Perform an optimistic update
      if (previousBookings) {
        queryClient.setQueryData<Booking[]>(queryKey, 
          previousBookings.map(booking => 
            booking.id === id ? { ...booking, status } : booking
          )
        );
      }
      
      // Return context with the snapshot
      return { previousBookings };
    },
    onSuccess: (updatedBooking) => {
      // Use specific invalidation to refresh just the affected queries
      toast.success(`Booking status updated to ${updatedBooking.status}`);
      
      // Clear any lingering error state
      queryClient.resetQueries({ 
        queryKey: ['booking-error', updatedBooking.id],
        exact: true
      });
    },
    onError: (error, variables, context) => {
      // Roll back to the previous state if the optimistic update was applied
      if (context?.previousBookings) {
        queryClient.setQueryData(queryKey, context.previousBookings);
      }
      
      handleApiError(
        error, 
        `Failed to update booking status to ${variables.status}`,
        "useBookings.updateStatus",
        "high"
      );
      
      // Save the error for potential UI display
      queryClient.setQueryData(
        ['booking-error', variables.id], 
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    },
    onSettled: () => {
      // Always invalidate affected queries to ensure data consistency
      queryClient.invalidateQueries({ queryKey });
    }
  });

  // Delete booking with improved error handling
  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      console.log(`Deleting booking ${id}`);
      
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onMutate: async (id) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot the previous value
      const previousBookings = queryClient.getQueryData<Booking[]>(queryKey);
      
      // Perform an optimistic update by removing the booking
      if (previousBookings) {
        queryClient.setQueryData<Booking[]>(
          queryKey, 
          previousBookings.filter(booking => booking.id !== id)
        );
      }
      
      return { previousBookings };
    },
    onSuccess: (id) => {
      toast.success("Booking deleted successfully");
      
      // Clear any lingering error state
      queryClient.resetQueries({ 
        queryKey: ['booking-error', id],
        exact: true
      });
    },
    onError: (error, id, context) => {
      // Roll back to the previous state
      if (context?.previousBookings) {
        queryClient.setQueryData(queryKey, context.previousBookings);
      }
      
      handleApiError(
        error, 
        `Failed to delete booking`,
        "useBookings.deleteBooking",
        "high"
      );
      
      // Save the error for potential UI display
      queryClient.setQueryData(
        ['booking-error', id], 
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    },
    onSettled: () => {
      // Always invalidate affected queries to ensure data consistency
      queryClient.invalidateQueries({ queryKey });
    }
  });

  // Helper to refresh data with current filters
  const refreshBookings = () => {
    console.log("Manually refreshing bookings data");
    return queryClient.invalidateQueries({ queryKey });
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
