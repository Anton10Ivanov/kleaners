
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatus, SortField, SortOrder } from "@/components/admin/sections/bookings/types";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const bookingsQuery = useQuery({
    queryKey: ['admin-bookings', selectedStatus, searchTerm, sortField, sortOrder, dateRange],
    queryFn: async () => {
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

      if (dateRange?.from && dateRange?.to) {
        return data.filter(booking => 
          booking.date && 
          isWithinInterval(parseISO(booking.date), {
            start: dateRange.from,
            end: dateRange.to
          })
        );
      }

      return data;
    },
  });

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "Success",
        description: "Booking status updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update booking status: " + error.message,
      });
    },
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete booking: " + error.message,
      });
    },
  });

  return {
    bookings: bookingsQuery.data,
    isLoading: bookingsQuery.isLoading,
    updateBookingStatus: updateBookingStatus.mutate,
    deleteBooking: deleteBooking.mutate,
  };
};
