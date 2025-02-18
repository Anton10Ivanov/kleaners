
import { useState } from "react";
import { startOfWeek, addDays, eachDayOfInterval } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { Link } from "react-router-dom";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";
import { DatePicker } from "./calendar/DatePicker";
import { TimeSlots } from "./calendar/TimeSlots";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const futureLimit = addDays(nowInBerlin, 31);

  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

  const timeSlots = Array.from({ length: 27 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minutes = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTimeSlot(undefined);
  };

  const handleTimeSlotSelect = async (timeSlot: string) => {
    if (!date) return;

    const [hours, minutes] = timeSlot.split(':').map(Number);
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hours, minutes);

    setSelectedTimeSlot(timeSlot);
    
    try {
      await addToGoogleCalendar(
        selectedDateTime,
        "Regular Cleaning",
        2,
        "Address will be provided"
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
    <div className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Select a date and time for first cleaning
      </h3>

      <div className="space-y-6">
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
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          date={date}
          nowInBerlin={nowInBerlin}
          onTimeSlotSelect={handleTimeSlotSelect}
        />
      </div>
      
      {!selectedTimeSlot && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
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
