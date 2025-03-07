
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BookingFormData } from '@/schemas/booking';

export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  const submitBooking = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      // Get current user, if logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare booking data
      const bookingData = {
        service_type: data.service,
        hours: data.hours,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        frequency: data.frequency,
        date: data.date,
        preferredTime: data.preferredTime,
        extras: data.extras,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        postal_code: data.postalCode,
        special_instructions: data.specialInstructions,
        total_price: data.totalAmount,
        user_id: user?.id, // Will be null for guest bookings
        status: 'pending',
        assigned_provider_id: data.selectedProviderId || null
      };
      
      // Insert booking into supabase
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();
        
      if (error) throw error;
      
      console.log('Booking submitted:', booking);
      setBookingId(booking.id);
      toast.success('Booking submitted successfully!');
      
      // If a provider was selected, notify them
      if (data.selectedProviderId) {
        // In a real app, you would send a notification to the provider
        console.log(`Notifying provider ${data.selectedProviderId} of new booking`);
      }
      
      return booking;
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('There was an error submitting your booking. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    submitBooking,
    isSubmitting,
    bookingId
  };
};
