
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, ProviderOption } from "@/schemas/booking";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface ProviderAvailabilityProps {
  selectedTimeSlot: string | undefined;
  date: Date | undefined;
  postalCode: string;
  form: UseFormReturn<BookingFormData>;
}

export const ProviderAvailability = ({ 
  selectedTimeSlot, 
  date, 
  postalCode, 
  form 
}: ProviderAvailabilityProps) => {
  const [availableProviders, setAvailableProviders] = useState<any[]>([]);

  // Fetch available providers for the selected date and time slot
  useEffect(() => {
    const fetchAvailableProviders = async () => {
      if (!date || !selectedTimeSlot) return;
      
      try {
        const [startTime] = selectedTimeSlot.split('-');
        const selectedDateTime = new Date(date);
        const [hours, minutes] = startTime.split(':').map(Number);
        selectedDateTime.setHours(hours, minutes);
        
        // Fetch providers who are available and service the postal code
        const { data: providers, error } = await supabase
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
          
        if (error) {
          console.error('Error fetching providers:', error);
          return;
        }
        
        const available = providers.filter(provider => {
          // Check if provider has availability that includes the selected time
          return provider.provider_availability.some((slot: any) => {
            const slotStart = new Date(slot.start_time);
            const slotEnd = new Date(slot.end_time);
            return selectedDateTime >= slotStart && selectedDateTime <= slotEnd;
          });
        });
        
        setAvailableProviders(available);
        
        if (available.length > 0) {
          const providerOptions: ProviderOption[] = available.map(p => ({
            id: p.id,
            name: `${p.first_name} ${p.last_name}`,
            rating: 4.5, // Default rating
            price: 25 // Default hourly rate
          }));
          form.setValue('providerOptions', providerOptions);
        } else {
          form.setValue('providerOptions', []);
        }
      } catch (err) {
        console.error('Error processing provider availability:', err);
      }
    };
    
    fetchAvailableProviders();
  }, [date, selectedTimeSlot, postalCode, form]);

  if (!selectedTimeSlot) return null;

  return (
    <>
      {availableProviders.length > 0 && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-3 rounded-md">
          <p className="text-sm text-green-800 dark:text-green-300">
            <span className="font-medium">{availableProviders.length}</span> provider{availableProviders.length !== 1 ? 's' : ''} available at this time
          </p>
        </div>
      )}
      
      {selectedTimeSlot && availableProviders.length === 0 && (
        <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 p-3 rounded-md">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            No providers currently available at this time. Your booking will be matched with the next available provider.
          </p>
        </div>
      )}
    </>
  );
};
