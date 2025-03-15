
import { useApiQuery } from '@/hooks/useApiQuery';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { UserBooking, UseUserBookingsResult } from '@/types/bookings';
import { 
  fetchUserBookings, 
  cancelUserBooking, 
  rescheduleUserBooking,
  checkInvoiceExists,
  createInvoiceRecord
} from '@/services/bookingsService';
import { BookingStatus } from '@/types/enums';

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
      const success = await cancelUserBooking(bookingId);
      
      if (success) {
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
      const success = await rescheduleUserBooking(bookingId, newDate);
      
      if (success) {
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
      const booking = bookings.find(b => b.id === bookingId);
      
      if (!booking) {
        toast.error('Booking not found');
        return false;
      }
      
      if (booking.status !== BookingStatus.Completed) {
        toast.error('Can only generate invoices for completed bookings');
        return false;
      }
      
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        toast.error('User not authenticated');
        return false;
      }
      
      // Check if invoice already exists
      const exists = await checkInvoiceExists(bookingId);
      
      if (exists) {
        toast.info('Invoice already exists for this booking');
        return true;
      }
      
      // Create invoice record
      const success = await createInvoiceRecord(booking, user.user.id);
      
      if (success) {
        toast.success('Invoice generated successfully');
      } else {
        toast.error('Failed to generate invoice');
      }
      
      return success;
    } catch (error) {
      console.error('Error generating invoice:', error);
      toast.error('Failed to generate invoice');
      return false;
    }
  };

  // For demonstration purposes, auto-generate invoices for completed bookings
  useEffect(() => {
    const createMockInvoices = async () => {
      if (isLoading || !bookings.length) return;
      
      // Find completed bookings and create invoices for them
      const completedBookings = bookings.filter(b => b.status === BookingStatus.Completed);
      
      for (const booking of completedBookings) {
        await generateInvoice(booking.id);
      }
    };
    
    createMockInvoices();
  }, [bookings, isLoading]);

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
