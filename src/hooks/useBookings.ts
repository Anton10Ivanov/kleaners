
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import { BookingStatus, SortField, SortOrder } from "@/components/admin/sections/bookings/types";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      try {
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
        
        if (error) throw new Error(error.message);
        
        if (!data) return [];

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
      } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
      }
    },
  });

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return { id, status };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "Success",
        description: `Booking status updated to ${data.status}`,
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update booking status: ${error.message}`,
      });
    },
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete booking: ${error.message}`,
      });
    },
  });

  return {
    bookings: bookingsQuery.data || [],
    isLoading: bookingsQuery.isLoading,
    error: bookingsQuery.error as Error | null,
    updateBookingStatus: updateBookingStatus.mutate,
    deleteBooking: deleteBooking.mutate,
  };
};
