
import { useState } from 'react';
import { BookingFormData } from '@/schemas/booking';
import { toast } from 'sonner';
import useBookingStore from '@/store/useBookingStore';
import { generateBookingReference } from '@/utils/bookingReference';
import { formPersistence } from '@/utils/formPersistence';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { getPrice } from '@/utils/pricing';

interface BookingSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  error?: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

interface BookingWithStatus extends BookingFormData {
  referenceNumber: string;
  status: BookingStatus;
  createdAt: Date;
  emailSent: boolean;
}

/**
 * Enhanced hook for handling booking submission with confirmation and email flow
 */
export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    bookingData: BookingFormData;
    referenceNumber: string;
  } | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(BookingStatus.PENDING);
  
  const resetForm = useBookingStore(state => state.resetForm);
  const { user } = useAuth();
  
  /**
   * Send confirmation email
   */
  const sendConfirmationEmail = async (bookingData: BookingFormData, referenceNumber: string): Promise<boolean> => {
    try {
      console.log('Sending confirmation email for booking:', referenceNumber);
      
      // Simulate email sending API call
      const emailData = {
        to: bookingData.email,
        subject: `Booking Confirmation - Reference #${referenceNumber}`,
        template: 'booking_confirmation',
        data: {
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          referenceNumber,
          serviceType: bookingData.serviceType,
          address: `${bookingData.address}, ${bookingData.city} ${bookingData.postalCode}`,
          date: bookingData.date?.toLocaleDateString(),
          specialInstructions: bookingData.specialInstructions || 'None'
        }
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Email sent successfully:', emailData);
      toast.success('Confirmation email sent!');
      return true;
      
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      toast.error('Failed to send confirmation email. We will contact you shortly.');
      return false;
    }
  };
  
  /**
   * Update booking status
   */
  const updateBookingStatus = (newStatus: BookingStatus) => {
    setBookingStatus(newStatus);
    console.log('Booking status updated to:', newStatus);
  };
  
  /**
   * Submit booking data with enhanced error handling, confirmation, and email flow
   */
  const submitBooking = async (data: BookingFormData): Promise<BookingSubmissionResult> => {
    setIsSubmitting(true);
    updateBookingStatus(BookingStatus.PENDING);
    
    if (!user) {
      toast.error("You need to be logged in to complete a booking.");
      setIsSubmitting(false);
      return { success: false, error: 'User not authenticated' };
    }

    try {
      // Validate required fields
      if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        throw new Error('Please fill in all required personal information');
      }
      
      if (!data.address || !data.city || !data.postalCode) {
        throw new Error('Please provide a complete address');
      }
      
      if (!data.accessMethod) {
        throw new Error('Please specify how we should access your property');
      }
      
      // Generate booking reference
      const referenceNumber = generateBookingReference();
      
      console.log('Submitting booking with reference:', referenceNumber, data);
      
      // Map form data to database schema and insert into Supabase
      const { error: insertError } = await supabase.from('bookings').insert({
        client_id: user.id,
        service_type: data.serviceType === 'home' ? 'regular' : 'business',
        booking_date: data.date.toISOString(),
        start_time: data.preferredTime,
        status: 'pending',
        total_price: getPrice(data), // Using a utility to calculate price
        address: `${data.address}, ${data.city} ${data.postalCode}`,
        notes: data.specialInstructions,
        frequency: data.frequency,
        extras: data.extras.map(e => e.name),
      });

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw new Error('Could not save your booking. Please try again.');
      }
      
      // Create booking with status tracking
      const bookingWithStatus: BookingWithStatus = {
        ...data,
        referenceNumber,
        status: BookingStatus.PENDING,
        createdAt: new Date(),
        emailSent: false
      };
      
      // Simulate API call with realistic delay
      // This part can be removed if there's no other async operation after DB insert
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update status to confirmed
      updateBookingStatus(BookingStatus.CONFIRMED);
      
      // Send confirmation email
      const emailSent = await sendConfirmationEmail(data, referenceNumber);
      
      // Update booking with email status
      bookingWithStatus.emailSent = emailSent;
      bookingWithStatus.status = BookingStatus.CONFIRMED;
      
      // Store confirmation data
      setConfirmationData({
        bookingData: data,
        referenceNumber
      });
      
      // Success! Show toast and clear form persistence
      toast.success(`Booking confirmed! Reference: #${referenceNumber}`);
      formPersistence.clear();
      
      return {
        success: true,
        referenceNumber
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error submitting booking:', error);
      
      updateBookingStatus(BookingStatus.CANCELLED);
      toast.error(errorMessage);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Clear confirmation data and reset form
   */
  const clearConfirmation = () => {
    setConfirmationData(null);
    setBookingStatus(BookingStatus.PENDING);
    resetForm();
  };
  
  /**
   * Get current booking status with display text
   */
  const getStatusDisplay = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return { text: 'Pending', color: 'text-yellow-600' };
      case BookingStatus.CONFIRMED:
        return { text: 'Confirmed', color: 'text-green-600' };
      case BookingStatus.IN_PROGRESS:
        return { text: 'In Progress', color: 'text-blue-600' };
      case BookingStatus.COMPLETED:
        return { text: 'Completed', color: 'text-green-700' };
      case BookingStatus.CANCELLED:
        return { text: 'Cancelled', color: 'text-red-600' };
      default:
        return { text: 'Unknown', color: 'text-gray-600' };
    }
  };
  
  return {
    submitBooking,
    isSubmitting,
    confirmationData,
    clearConfirmation,
    bookingStatus,
    updateBookingStatus,
    getStatusDisplay,
    sendConfirmationEmail
  };
};

export default useBookingSubmission;
