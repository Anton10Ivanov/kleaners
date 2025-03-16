
import { useState } from 'react';
import { BookingFormData } from '@/schemas/booking';
import { toast } from 'sonner';
import useBookingStore from '@/store/useBookingStore';

/**
 * Custom hook for handling booking submission
 */
export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetForm = useBookingStore(state => state.resetForm);
  
  /**
   * Submit booking data to API
   */
  const submitBooking = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we would call an API here
      console.log('Submitting booking:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Show toast and reset form
      toast.success('Booking submitted successfully!');
      resetForm();
      
      // In a real app, we would redirect to a confirmation page
      return true;
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('There was an error submitting your booking. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    submitBooking,
    isSubmitting
  };
};

export default useBookingSubmission;
