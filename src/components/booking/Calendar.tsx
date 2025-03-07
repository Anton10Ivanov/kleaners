
import { useState, useEffect } from "react";
import { startOfWeek, addDays, eachDayOfInterval } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { Link } from "react-router-dom";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";
import { DatePicker } from "@/components/booking/calendar/DatePicker";
import { TimeSlots } from "@/components/booking/calendar/TimeSlots";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useMediaQuery } from "@/hooks/use-media-query";
import { supabase } from "@/integrations/supabase/client";

interface CalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const Calendar = ({
  form
}: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), {
    weekStartsOn: 1
  }));
  const [availableProviders, setAvailableProviders] = useState<any[]>([]);
  const date = form.watch('date');
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const futureLimit = addDays(nowInBerlin, 31);
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

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
          form.setValue('providerOptions', available.map(p => ({
            id: p.id,
            name: `${p.first_name} ${p.last_name}`
          })));
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

  const handleTimeSlotSelect = async (timeSlot: string) => {
    if (!date) return;
    const [startTime] = timeSlot.split('-');
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
    
    try {
      await addToGoogleCalendar(date, form.watch('service') || "Regular Cleaning", form.watch('hours') || 2, form.watch('address') || "Address will be provided");
      toast.success("Event added to Google Calendar!");
    } catch (error) {
      console.error("Failed to add event to Google Calendar:", error);
      toast.error("Failed to add event to Google Calendar. Please try again.");
    }
  };

  const handlePreviousWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, 7));
  };

  return <div className="bg-white dark:bg-dark-background p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <h3 className={`text-lg ${isMobile ? 'text-center' : 'text-xl'} font-semibold mb-4 md:mb-6 text-gray-900 dark:text-white`}>Find a date and time that fits your schedule</h3>

      <div className="space-y-4 md:space-y-6">
        <DatePicker weekDates={weekDates} date={date} nowInBerlin={nowInBerlin} futureLimit={futureLimit} weekStart={weekStart} onDateSelect={handleDateSelect} onPreviousWeek={handlePreviousWeek} onNextWeek={handleNextWeek} />

        <TimeSlots selectedTimeSlot={selectedTimeSlot} date={date} nowInBerlin={nowInBerlin} onTimeSlotSelect={handleTimeSlotSelect} selectedHours={hours} />
        
        {selectedTimeSlot && availableProviders.length > 0 && (
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
      </div>
      
      {!selectedTimeSlot && <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left">
          If there are no preferred time slots available, please select another date or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
        </p>}
    </div>;
};

export default Calendar;
