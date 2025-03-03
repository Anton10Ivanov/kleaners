
import { useState } from "react";
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

interface CalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const Calendar = ({ form }: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const date = form.watch('date');
  const hours = form.watch('hours') || 2;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const futureLimit = addDays(nowInBerlin, 31);

  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    form.setValue('date', selectedDate);
    setSelectedTimeSlot(undefined);
  };

  const handleTimeSlotSelect = async (timeSlot: string) => {
    if (!date) return;

    const [startTime] = timeSlot.split('-');
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
    
    try {
      await addToGoogleCalendar(
        date,
        form.watch('service') || "Regular Cleaning",
        form.watch('hours') || 2,
        form.watch('address') || "Address will be provided"
      );
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

  return (
    <div className="bg-white dark:bg-dark-background p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <h3 className={`text-lg ${isMobile ? 'text-center' : 'text-xl'} font-semibold mb-4 md:mb-6 text-gray-900 dark:text-white`}>
        Select a date and time for cleaning
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
      </div>
      
      {!selectedTimeSlot && (
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-4 text-center md:text-left">
          If there are no preferred time slots available, please select another date or{" "}
          <Link
            to="/contact"
            className="text-primary hover:underline"
          >
            contact us
          </Link>
        </p>
      )}
    </div>
  );
};

export default Calendar;
