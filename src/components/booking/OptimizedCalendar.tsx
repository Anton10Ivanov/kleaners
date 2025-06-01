import { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { Link } from "react-router-dom";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, ProviderOption } from "@/schemas/booking";
import { useMediaQuery } from "@/hooks/use-media-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

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
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');

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

  // Updated time slots for 08:00-20:00 with 30-minute intervals
  const timeSlots = [
    { time: '08:00-10:00', period: 'morning', label: '8:00 AM' },
    { time: '08:30-10:30', period: 'morning', label: '8:30 AM' },
    { time: '09:00-11:00', period: 'morning', label: '9:00 AM' },
    { time: '09:30-11:30', period: 'morning', label: '9:30 AM' },
    { time: '10:00-12:00', period: 'morning', label: '10:00 AM' },
    { time: '10:30-12:30', period: 'morning', label: '10:30 AM' },
    { time: '11:00-13:00', period: 'morning', label: '11:00 AM' },
    { time: '11:30-13:30', period: 'morning', label: '11:30 AM' },
    { time: '12:00-14:00', period: 'afternoon', label: '12:00 PM' },
    { time: '12:30-14:30', period: 'afternoon', label: '12:30 PM' },
    { time: '13:00-15:00', period: 'afternoon', label: '1:00 PM' },
    { time: '13:30-15:30', period: 'afternoon', label: '1:30 PM' },
    { time: '14:00-16:00', period: 'afternoon', label: '2:00 PM' },
    { time: '14:30-16:30', period: 'afternoon', label: '2:30 PM' },
    { time: '15:00-17:00', period: 'afternoon', label: '3:00 PM' },
    { time: '15:30-17:30', period: 'afternoon', label: '3:30 PM' },
    { time: '16:00-18:00', period: 'afternoon', label: '4:00 PM' },
    { time: '16:30-18:30', period: 'afternoon', label: '4:30 PM' },
    { time: '17:00-19:00', period: 'evening', label: '5:00 PM' },
    { time: '17:30-19:30', period: 'evening', label: '5:30 PM' },
    { time: '18:00-20:00', period: 'evening', label: '6:00 PM' },
  ];

  const filteredTimeSlots = timeSlots.filter(slot => 
    timeFilter === 'all' || slot.period === timeFilter
  );

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
            name: `${p.first_name} ${p.last_name}`
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

  const handleTimeSlotSelect = async (timeSlot: string) => {
    if (!date) return;
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
    
    try {
      const service = form.watch('service');
      const serviceString = service ? String(service) : "Regular Cleaning";
      await addToGoogleCalendar(date, serviceString, hours, "Address will be provided");
      toast.success("Event added to Google Calendar!");
    } catch (error) {
      console.error("Failed to add event to Google Calendar:", error);
      toast.error("Failed to add event to Google Calendar. Please try again.");
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setWeekStart(prev => addDays(prev, direction === 'next' ? 7 : -7));
  };

  const isDateDisabled = (dateToCheck: Date) => {
    const oneWeekAgo = subDays(nowInBerlin, 7);
    const futureLimit = addDays(nowInBerlin, 31);
    return dateToCheck < oneWeekAgo || dateToCheck > futureLimit;
  };

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

      {/* Time Filter */}
      {date && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Day' },
            { key: 'morning', label: 'Morning' },
            { key: 'afternoon', label: 'Afternoon' },
            { key: 'evening', label: 'Evening' },
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={timeFilter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFilter(key as any)}
              className="flex-shrink-0"
            >
              {label}
            </Button>
          ))}
        </div>
      )}

      {/* Time Slots */}
      {date && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
        >
          {filteredTimeSlots.map((slot) => {
            const isSelected = selectedTimeSlot === slot.time;
            
            return (
              <Button
                key={slot.time}
                variant={isSelected ? 'default' : 'outline'}
                onClick={() => handleTimeSlotSelect(slot.time)}
                className={`
                  h-12 flex flex-col items-center justify-center transition-all
                  ${isSelected ? 'bg-primary text-white shadow-lg' : 'hover:border-primary/50'}
                `}
              >
                <span className="font-medium">{slot.label}</span>
                <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {slot.period}
                </span>
              </Button>
            );
          })}
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

      {!selectedTimeSlot && (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          If no preferred time slots are available, please select another date or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
        </p>
      )}
    </div>
  );
};

export default OptimizedCalendar;
