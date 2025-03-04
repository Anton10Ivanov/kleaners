
import { useApiQuery } from '@/hooks/useApiQuery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Interface representing a user booking
 */
export interface UserBooking {
  /** Unique booking identifier */
  id: string;
  
  /** Status of the booking (pending, completed, cancelled) */
  status: 'pending' | 'completed' | 'cancelled';
  
  /** Date and time of the booking */
  date: string;
  
  /** Service type booked */
  service: string;
  
  /** Address where service will be performed */
  address: string;
  
  /** Total price of the booking */
  price: number;
  
  /** Duration of the service in hours */
  duration: number;
  
  /** Additional notes or special instructions */
  notes?: string;
  
  /** Name of assigned service provider (if any) */
  providerName?: string;
}

/**
 * Result object returned by useUserBookings hook
 */
interface UseUserBookingsResult {
  /** Array of user bookings */
  bookings: UserBooking[];
  
  /** Whether bookings are currently loading */
  isLoading: boolean;
  
  /** Error object if the fetch failed */
  error: Error | null;
  
  /** Function to manually refetch bookings */
  refetch: () => void;
  
  /** Function to cancel a booking */
  cancelBooking: (bookingId: string) => Promise<boolean>;
  
  /** Function to reschedule a booking */
  rescheduleBooking: (bookingId: string, newDate: string) => Promise<boolean>;
}

/**
 * Custom hook to fetch and manage user bookings
 * 
 * @returns {UseUserBookingsResult} Object containing bookings data and status
 * 
 * @example
 * ```tsx
 * const { bookings, isLoading, error } = useUserBookings();
 * 
 * if (isLoading) return <Loading />;
 * if (error) return <ErrorDisplay message={error.message} />;
 * 
 * return <BookingsList bookings={bookings} />;
 * ```
 */
export function useUserBookings(): UseUserBookingsResult {
  // Fetch user bookings from Supabase
  const fetchUserBookings = async (): Promise<UserBooking[]> => {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
    
    // In a real app, this would fetch from the 'bookings' table with user_id filter
    // Here we return mock data for demonstration
    const mockBookings: UserBooking[] = [
      {
        id: "1",
        status: "pending",
        date: "2023-05-15T10:00:00",
        service: "Regular Cleaning",
        address: "123 Main St, Apt 4B",
        price: 120,
        duration: 3,
        providerName: "Maria Johnson"
      },
      {
        id: "2",
        status: "completed",
        date: "2023-05-01T14:00:00",
        service: "Deep Cleaning",
        address: "123 Main St, Apt 4B",
        price: 210,
        duration: 5
      },
      {
        id: "3",
        status: "cancelled",
        date: "2023-04-22T09:00:00",
        service: "Move In/Out Cleaning",
        address: "456 Park Ave, Suite 203",
        price: 180,
        duration: 4,
        notes: "Cancelled due to scheduling conflict"
      }
    ];
    
    return mockBookings;
  };

  const {
    data: bookings = [],
    isLoading,
    error,
    refetch
  } = useApiQuery<UserBooking[]>({
    queryKey: ['userBookings'],
    queryFn: fetchUserBookings,
    onErrorHandler: (error) => {
      toast.error('Failed to load bookings', {
        description: error.message
      });
    }
  });

  // Cancel a booking
  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      // In a real app, this would update the booking status in Supabase
      toast.success('Booking cancelled successfully');
      
      // Refresh the bookings list
      refetch();
      
      return true;
    } catch (error) {
      toast.error('Failed to cancel booking');
      return false;
    }
  };

  // Reschedule a booking
  const rescheduleBooking = async (bookingId: string, newDate: string): Promise<boolean> => {
    try {
      // In a real app, this would update the booking date in Supabase
      toast.success('Booking rescheduled successfully');
      
      // Refresh the bookings list
      refetch();
      
      return true;
    } catch (error) {
      toast.error('Failed to reschedule booking');
      return false;
    }
  };

  return {
    bookings,
    isLoading,
    error: error || null,
    refetch,
    cancelBooking,
    rescheduleBooking
  };
}
