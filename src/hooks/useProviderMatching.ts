
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BookingFormData, Frequency, ProviderOption } from '@/schemas/booking';
import { toast } from 'sonner';

interface Provider {
  id: string;
  name: string;
  rating?: number;
  services?: string[];
  skills?: string[];
  availability?: {
    days: string[];
    timeSlots: Record<string, string[]>;
  };
  location?: {
    postalCodes: string[];
    radius: number;
  };
  price_per_hour?: number;
}

export const useProviderMatching = (bookingData: BookingFormData) => {
  const [providers, setProviders] = useState<ProviderOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      if (!bookingData.service) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch all active providers from database
        const { data, error } = await supabase
          .from('providers')
          .select('*')
          .eq('status', 'active');

        if (error) throw error;

        if (!data || data.length === 0) {
          setProviders([]);
          return;
        }

        // Apply matching algorithm
        const matchedProviders = matchProviders(data as Provider[], bookingData);
        
        // Convert to ProviderOption format
        const providerOptions: ProviderOption[] = matchedProviders.map(provider => ({
          id: provider.id,
          name: provider.name,
          rating: provider.rating
        }));

        setProviders(providerOptions);
        
        // Set in form
        // bookingData.providerOptions = providerOptions;
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError(err as Error);
        toast.error('Failed to load providers. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, [bookingData.service, bookingData.postalCode]);

  const matchProviders = (providers: Provider[], booking: BookingFormData): Provider[] => {
    return providers.filter(provider => {
      // Filter by service type
      if (provider.services && booking.service && !provider.services.includes(booking.service)) {
        return false;
      }
      
      // Filter by location
      if (
        booking.postalCode && 
        provider.location?.postalCodes && 
        !provider.location.postalCodes.includes(booking.postalCode)
      ) {
        return false;
      }
      
      // Filter by day availability for recurring bookings
      if (
        booking.frequency !== Frequency.OneTime && 
        booking.weekdayPreference &&
        provider.availability?.days &&
        !provider.availability.days.includes(booking.weekdayPreference)
      ) {
        return false;
      }
      
      // Filter by time slot availability
      if (
        booking.timePreference &&
        provider.availability?.timeSlots &&
        booking.weekdayPreference &&
        provider.availability.timeSlots[booking.weekdayPreference] &&
        booking.timePreference &&
        !provider.availability.timeSlots[booking.weekdayPreference].includes(booking.timePreference)
      ) {
        return false;
      }
      
      // Additional matching criteria can be added here
      
      return true;
    });
  };

  return {
    providers,
    isLoading,
    error
  };
};

export default useProviderMatching;
