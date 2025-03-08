
import { UserBooking } from '@/types/bookings';
import { supabase } from '@/integrations/supabase/client';

/**
 * Fetches user bookings from the database
 * @returns Promise resolving to an array of user bookings
 */
export const fetchUserBookings = async (): Promise<UserBooking[]> => {
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

/**
 * Cancels a booking
 * @param bookingId ID of the booking to cancel
 * @returns Promise resolving to true if cancellation was successful
 */
export const cancelUserBooking = async (bookingId: string): Promise<boolean> => {
  try {
    // In a real app, this would update the booking status in Supabase
    // For demo purposes, we'll return success
    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
};

/**
 * Reschedules a booking
 * @param bookingId ID of the booking to reschedule
 * @param newDate New date for the booking
 * @returns Promise resolving to true if rescheduling was successful
 */
export const rescheduleUserBooking = async (bookingId: string, newDate: string): Promise<boolean> => {
  try {
    // In a real app, this would update the booking date in Supabase
    // For demo purposes, we'll return success
    return true;
  } catch (error) {
    console.error('Error rescheduling booking:', error);
    return false;
  }
};

/**
 * Checks if an invoice already exists for a booking
 * @param bookingId ID of the booking to check
 * @returns Promise resolving to true if an invoice exists
 */
export const checkInvoiceExists = async (bookingId: string): Promise<boolean> => {
  const { data: existingInvoice } = await supabase
    .from('invoices')
    .select('id')
    .eq('booking_id', bookingId)
    .maybeSingle();
    
  return !!existingInvoice;
};

/**
 * Creates an invoice record for a booking
 * @param booking Booking to create invoice for
 * @param userId User ID
 * @returns Promise resolving to true if invoice was created successfully
 */
export const createInvoiceRecord = async (
  booking: UserBooking, 
  userId: string
): Promise<boolean> => {
  try {
    // Generate invoice number (simple implementation for demo)
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    
    // Create invoice record
    const { error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        booking_id: booking.id,
        amount: booking.price,
        invoice_number: invoiceNumber,
        file_path: `${userId}/${booking.id}.pdf`
      });
      
    if (invoiceError) {
      console.error('Error creating invoice:', invoiceError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error generating invoice:', error);
    return false;
  }
};
