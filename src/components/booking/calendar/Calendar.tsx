
import { useState, useEffect } from "react";
import { startOfWeek, addDays, eachDayOfInterval } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DatePicker } from "./DatePicker";
import { TimeSlots } from "./TimeSlots";
import { ProviderAvailability } from "./ProviderAvailability";
import { CalendarFooter } from "./CalendarFooter";

interface CalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const Calendar = ({ form }: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), {
    weekStartsOn: 1
  }));
  
  // Watch form values
  const date = form.watch('date');
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode');
  
  // Utils
  const isMobile = useMediaQuery("(max-width: 768px)");
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const futureLimit = addDays(nowInBerlin, 31);
  
  // Date range for the week view
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    form.setValue('date', selectedDate);
    setSelectedTimeSlot(undefined);
    form.setValue('preferredTime', undefined);
    form.setValue('providerOptions', []);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
  };

  const handlePreviousWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, 7));
  };

  return (
    <div className="bg-white dark:bg-dark-background p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <h3 className={`text-lg ${isMobile ? 'text-center' : 'text-xl'} font-semibold mb-4 md:mb-6 text-gray-900 dark:text-white`}>
        Find a date and time that fits your schedule
      </h3>

      <div className="space-y-4 md:space-y-6">
        <DatePicker 
          weekDates={weekDates} 
          date={date} 
          nowInBerlin={nowInBerlin} 
          futureLimit={futureLimit} 
          weekStart={weekStart} 
          onDateSelect={handleDateSelect} 
          onPreviousWeek={handlePreviousWeek} 
          onNextWeek={handleNextWeek} 
        />

        <TimeSlots 
          selectedTimeSlot={selectedTimeSlot} 
          date={date} 
          nowInBerlin={nowInBerlin} 
          onTimeSlotSelect={handleTimeSlotSelect} 
          selectedHours={hours} 
        />
        
        <ProviderAvailability 
          selectedTimeSlot={selectedTimeSlot}
          date={date}
          postalCode={postalCode}
          form={form}
        />
      </div>
      
      <CalendarFooter 
        selectedTimeSlot={selectedTimeSlot}
      />
    </div>
  );
};

export default Calendar;
