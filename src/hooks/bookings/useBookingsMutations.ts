
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingStatus, Booking } from "@/components/admin/sections/bookings/types";
import { supabase } from "@/integrations/supabase/client";
import { handleApiError, ErrorSeverity } from "@/utils/errorHandling";
import { toast } from "sonner";
import { getBookingsQueryKey } from "./bookingsUtils";

export const useBookingsMutations = (currentFilters: any) => {
  const queryClient = useQueryClient();
  
  // Query key based on current filters
  const queryKey = getBookingsQueryKey(currentFilters);

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
        queryClient.setQueryData(
          queryKey, 
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
        "useBookingsMutations.updateStatus",
        ErrorSeverity.HIGH
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
        "useBookingsMutations.deleteBooking",
        ErrorSeverity.HIGH
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
  
  return {
    updateBookingStatus,
    deleteBooking
  };
};
