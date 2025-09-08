'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Provider {
  id: string;
  first_name: string;
  last_name: string;
  provider_service_areas: { postal_code: string[] }[];
  provider_availability: { start_time: string; end_time: string }[];
}

interface UseProviderMatchingProps {
  date: Date | undefined;
  selectedTimeSlot: string | undefined;
  postalCode: string;
}

export const useProviderMatching = ({ date, selectedTimeSlot, postalCode }: UseProviderMatchingProps) => {
  const [availableProviders, setAvailableProviders] = useState<
    { id: string; name: string; rating: number; price: number }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAvailableProviders = async () => {
      if (!date || !selectedTimeSlot || !postalCode) {
        setAvailableProviders([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [startTime] = selectedTimeSlot.split('-');
        const selectedDateTime = new Date(date);
        const [hours, minutes] = startTime.split(':').map(Number);
        selectedDateTime.setHours(hours, minutes);

        const { data: providers, error: fetchError } = await supabase
          .from('service_providers')
          .select(`
            id,
            first_name,
            last_name,
            provider_service_areas(postal_code),
            provider_availability(start_time, end_time)
          `)
          .eq('status', 'approved')
          .contains('provider_service_areas.postal_code', [postalCode]);

        if (fetchError) {
          setError(fetchError);
          return;
        }

        const available = (providers as Provider[]).filter(provider => {
          return provider.provider_availability.some(slot => {
            const slotStart = new Date(slot.start_time);
            const slotEnd = new Date(slot.end_time);
            return selectedDateTime >= slotStart && selectedDateTime <= slotEnd;
          });
        });

        setAvailableProviders(available.map(p => ({
          id: p.id,
          name: `${p.first_name} ${p.last_name}`,
          rating: 4.5,
          price: 25 // Add default price
        })));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableProviders();
  }, [date, selectedTimeSlot, postalCode]);

  return { availableProviders, loading, error };
};
