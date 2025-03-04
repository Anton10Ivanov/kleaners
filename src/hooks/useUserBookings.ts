
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * UserBooking interface
 * Represents a booking in the system
 */
export interface UserBooking {
  /** Unique identifier for the booking */
  id: string;
  
  /** Current status of the booking */
  status: "pending" | "confirmed" | "completed" | "cancelled";
  
  /** Type of service being provided */
  service_type: string;
  
  /** Scheduled date for the service */
  date: string | null;
  
  /** Location where service will be performed */
  address: string | null;
  
  /** Duration of the service in hours */
  hours: number;
  
  /** How often the service is performed */
  frequency: string;
  
  /** When the booking was created */
  created_at: string | null;
  
  /** Formatted date when booking was created */
  bookingDate?: string;
  
  /** Formatted scheduled date */
  scheduledDate?: string;
  
  /** Formatted scheduled time */
  scheduledTime?: string;
  
  /** Formatted service name */
  service?: string;
}

/**
 * useUserBookings hook
 * 
 * Custom hook to fetch and manage user bookings with React Query
 * 
 * @returns Object containing bookings data, loading state, and error
 */
export const useUserBookings = () => {
  const { toast } = useToast();

  /**
   * Fetches bookings for the currently authenticated user
   * @returns Promise resolving to transformed booking data
   */
  const fetchUserBookings = async (): Promise<UserBooking[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("No authenticated user");
    }
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) {
      throw error;
    }
    
    // Transform the data to match what the component expects
    const transformedBookings = data?.map(booking => ({
      ...booking,
      service: booking.service_type, // Map service_type to service
      bookingDate: booking.created_at, // Use created_at as booking date
      scheduledDate: booking.date ? new Date(booking.date).toLocaleDateString() : "To be scheduled",
      scheduledTime: booking.date ? new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Time TBD"
    })) || [];
    
    return transformedBookings;
  };

  // Use React Query to fetch and cache bookings
  const bookingsQuery = useQuery({
    queryKey: ['user-bookings'],
    queryFn: fetchUserBookings,
    onError: (error: Error) => {
      console.error("Error fetching bookings:", error);
      toast({
        variant: "destructive",
        title: "Error loading bookings",
        description: "We couldn't load your bookings. Please try again later."
      });
    }
  });

  return {
    bookings: bookingsQuery.data || [],
    isLoading: bookingsQuery.isLoading,
    error: bookingsQuery.error as Error | null,
    refetch: bookingsQuery.refetch
  };
};
