import { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, ProviderOption } from "@/schemas/booking";
import { useMediaQuery } from "@/hooks/use-media-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users } from "lucide-react";
import { motion } from "framer-motion";
import { TimeSlider } from "@/components/ui/time-slider";

interface OptimizedCalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const OptimizedCalendar = ({ form }: OptimizedCalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [availableProviders, setAvailableProviders] = useState<any[]>([]);
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 });
  });

  const date = form.watch('date');
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  
  // Generate week dates
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 })
  });

  // Fetch providers for selected date and time
  useEffect(() => {
    const fetchAvailableProviders = async () => {
      if (!date || !selectedTimeSlot) return;
      
      try {
        const [startTime] = selectedTimeSlot.split('-');
        const selectedDateTime = new Date(date);
        const [hours, minutes] = startTime.split(':').map(Number);
        selectedDateTime.setHours(hours, minutes);
        
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

  const handleDateSelect = (selectedDate: Date) => {
    form.setValue('date', selectedDate);
    setSelectedTimeSlot(undefined);
    form.setValue('preferredTime', undefined);
    form.setValue('providerOptions', []);
  };

  const handleTimeSlotSelect = (startTime: string) => {
    if (!date) return;
    
    // Calculate end time based on selected hours
    const [hour, minute] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hour, minute);
    const endDate = new Date(startDate.getTime() + hours * 60 * 60 * 1000);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    
    const timeSlot = `${startTime}-${endTime}`;
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setWeekStart(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  const isDateDisabled = (dateToCheck: Date) => {
    const oneWeekAgo = subDays(nowInBerlin, 7);
    const futureLimit = addDays(nowInBerlin, 31);
    return dateToCheck < oneWeekAgo || dateToCheck > futureLimit;
  };

  const currentStartTime = selectedTimeSlot ? selectedTimeSlot.split('-')[0] : '08:00';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select Date & Time
        </h3>
      </div>

      {/* Compact Week View */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Week Navigation */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('prev')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="font-medium text-gray-900 dark:text-white">
            {format(weekStart, 'MMM d')} - {format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'MMM d, yyyy')}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('next')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Date Grid */}
        <div className="grid grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700">
          {weekDates.map((weekDate, index) => {
            const isSelected = date && isSameDay(weekDate, date);
            const isDisabled = isDateDisabled(weekDate);
            const isToday = isSameDay(weekDate, nowInBerlin);

            return (
              <button
                key={index}
                onClick={() => !isDisabled && handleDateSelect(weekDate)}
                disabled={isDisabled}
                className={`
                  p-3 text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-700
                  ${isSelected ? 'bg-primary text-white' : ''}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${isToday && !isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                `}
              >
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  {format(weekDate, 'EEE')}
                </div>
                <div className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {format(weekDate, 'd')}
                </div>
                {isToday && (
                  <div className={`w-1 h-1 rounded-full mx-auto mt-1 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slider */}
      {date && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <TimeSlider
            value={currentStartTime}
            onChange={handleTimeSlotSelect}
          />
        </motion.div>
      )}

      {/* Provider Availability */}
      {selectedTimeSlot && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            p-3 rounded-lg border-l-4 
            ${availableProviders.length > 0 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-400' 
              : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">
              {availableProviders.length > 0
                ? `${availableProviders.length} provider${availableProviders.length !== 1 ? 's' : ''} available`
                : 'No providers currently available'
              }
            </span>
          </div>
          {availableProviders.length === 0 && (
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
              Your booking will be matched with the next available provider.
            </p>
          )}
        </motion.div>
      )}

      {!selectedTimeSlot && date && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Select a time using the slider above, or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
        </p>
      )}
    </div>
  );
};

export default OptimizedCalendar;
