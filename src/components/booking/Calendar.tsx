import { useState, useEffect } from "react";
import { startOfMonth, endOfMonth, addDays, subDays } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, ProviderOption } from "@/schemas/booking";
import { useMediaQuery } from "@/hooks/use-media-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { TimeSlots } from "@/components/booking/calendar/TimeSlots";

interface CalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const Calendar = ({
  form
}: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [availableProviders, setAvailableProviders] = useState<any[]>([]);
  const date = form.watch('date');
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  
  // Allow selection from 1 week ago to end of current month + next month
  const oneWeekAgo = subDays(nowInBerlin, 7);
  const futureLimit = endOfMonth(addDays(nowInBerlin, 31));

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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    form.setValue('date', selectedDate);
    setSelectedTimeSlot(undefined);
    form.setValue('preferredTime', undefined);
    form.setValue('providerOptions', []);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    if (!date) return;
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
    // Removed Google Calendar integration to prevent redirections
  };

  return (
    <div className="p-3 transition-colors duration-200">
      <h3 className={`text-lg ${isMobile ? 'text-center' : ''} font-semibold mb-3 text-gray-900 dark:text-white`}>
        Find a date and time that fits your schedule
      </h3>

      <div className="space-y-3">
        {/* Full month calendar view */}
        <div className="flex justify-center">
          <ShadcnCalendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => date < oneWeekAgo || date > futureLimit}
            className="rounded-md border border-gray-200 dark:border-gray-700 pointer-events-auto"
            showOutsideDays={false}
          />
        </div>

        <TimeSlots 
          selectedTimeSlot={selectedTimeSlot} 
          date={date} 
          nowInBerlin={nowInBerlin} 
          onTimeSlotSelect={handleTimeSlotSelect} 
          selectedHours={hours} 
        />
        
        {selectedTimeSlot && availableProviders.length > 0 && (
          <div className="mt-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-2 rounded-md">
            <p className="text-sm text-green-800 dark:text-green-300">
              <span className="font-medium">{availableProviders.length}</span> provider{availableProviders.length !== 1 ? 's' : ''} available at this time
            </p>
          </div>
        )}
        
        {selectedTimeSlot && availableProviders.length === 0 && (
          <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 p-2 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              No providers currently available at this time. Your booking will be matched with the next available provider.
            </p>
          </div>
        )}
      </div>
      
      {!selectedTimeSlot && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center md:text-left">
          If there are no preferred time slots available, please select another date or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
        </p>
      )}
    </div>
  );
};

export default Calendar;
