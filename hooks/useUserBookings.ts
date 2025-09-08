
import { useApiQuery } from '@/hooks/useApiQuery';
import { toast } from 'sonner';
import { UserBooking, UseUserBookingsResult } from '@/types/bookings';
import { BookingStatus } from '@/types/enums';
import { 
  getUserMockBookings, 
  updateMockBooking, 
  deleteMockBooking, 
  addMockNotification 
} from '@/utils/mock/mockDataService';

/**
 * Custom hook to fetch and manage user bookings
 * 
 * @returns {UseUserBookingsResult} Object containing bookings data and status
 
export function useUserBookings(): UseUserBookingsResult {
  // Use mock user ID for demo
  const mockUserId = 'mock-user-1';
  
  const fetchUserBookings = async (): Promise<UserBooking[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get bookings for this user from mock data service
    return getUserMockBookings(mockUserId);
  };
  
  const {
    data: bookings = [],
    isLoading,
    error,
    refetch
  } = useApiQuery<UserBooking[]>({
    queryKey: ['userBookings', mockUserId],
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
      // Update booking status in mock data
      const success = !!updateMockBooking(bookingId, { status: BookingStatus.Cancelled });
      
      if (success) {
        // Add notification
        addMockNotification({
          title: 'Booking Cancelled',
          message: `Your booking #${bookingId.substring(0, 8)} has been cancelled`,
          type: 'booking'
        });
        
        toast.success('Booking cancelled successfully');
        refetch();
      } else {
        toast.error('Failed to cancel booking');
      }
      
      return success;
    } catch (error) {
      toast.error('Failed to cancel booking');
      return false;
    }
  };

  // Reschedule a booking
  const rescheduleBooking = async (bookingId: string, newDate: string): Promise<boolean> => {
    try {
      // Update booking date in mock data
      const success = !!updateMockBooking(bookingId, { date: newDate });
      
      if (success) {
        // Add notification
        addMockNotification({
          title: 'Booking Rescheduled',
          message: `Your booking #${bookingId.substring(0, 8)} has been rescheduled`,
          type: 'booking'
        });
        
        toast.success('Booking rescheduled successfully');
        refetch();
      } else {
        toast.error('Failed to reschedule booking');
      }
      
      return success;
    } catch (error) {
      toast.error('Failed to reschedule booking');
      return false;
    }
  };

  // Generate an invoice for a completed booking
  const generateInvoice = async (bookingId: string): Promise<boolean> => {
    try {
      // In a real app, this would create an invoice in the database
      // For mock purposes, we'll just show a success message
      
      addMockNotification({
        title: 'Invoice Generated',
        message: `Invoice for booking #${bookingId.substring(0, 8)} has been generated`,
        type: 'booking'
      });
      
      toast.success('Invoice generated successfully');
      return true;
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice');
      return false;
    }
  };

  return {
    bookings,
    isLoading,
    error: error || null,
    refetch,
    cancelBooking,
    rescheduleBooking,
    generateInvoice
  };
}
