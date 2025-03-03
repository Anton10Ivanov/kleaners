
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserBooking {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  service_type: string;
  date: string | null;
  address: string | null;
  hours: number;
  frequency: string;
  created_at: string | null;
  // Additional fields needed by the UI
  bookingDate?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  service?: string;
}

export const useUserBookings = () => {
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No authenticated user");
        
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        // Transform the data to match what the component expects
        const transformedBookings = data?.map(booking => ({
          ...booking,
          service: booking.service_type, // Map service_type to service
          bookingDate: booking.created_at, // Use created_at as booking date
          scheduledDate: booking.date ? new Date(booking.date).toLocaleDateString() : "To be scheduled",
          scheduledTime: booking.date ? new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Time TBD"
        })) || [];
        
        setBookings(transformedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error as Error);
        toast({
          variant: "destructive",
          title: "Error loading bookings",
          description: "We couldn't load your bookings. Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [toast]);

  return { bookings, isLoading, error };
};
