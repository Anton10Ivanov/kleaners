
import { useState } from 'react';
import { BookingFormData } from '@/schemas/booking';
import { toast } from 'sonner';
import useBookingStore from '@/store/useBookingStore';
import { generateBookingReference } from '@/utils/bookingReference';
import { formPersistence } from '@/utils/formPersistence';

interface BookingSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  error?: string;
}

/**
 * Enhanced hook for handling booking submission with confirmation
 */
export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    bookingData: BookingFormData;
    referenceNumber: string;
  } | null>(null);
  
  const resetForm = useBookingStore(state => state.resetForm);
  
  /**
   * Submit booking data with enhanced error handling and confirmation
   */
  const submitBooking = async (data: BookingFormData): Promise<BookingSubmissionResult> => {
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        throw new Error('Please fill in all required fields');
      }
      
      if (!data.address || !data.city || !data.postalCode) {
        throw new Error('Please provide a complete address');
      }
      
      // Generate booking reference
      const referenceNumber = generateBookingReference();
      
      console.log('Submitting booking with reference:', referenceNumber, data);
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
    resetForm();
  };
  
  return {
    submitBooking,
    isSubmitting,
    confirmationData,
    clearConfirmation
  };
};

export default useBookingSubmission;
