
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { format, addDays, startOfWeek, eachDayOfInterval } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  // Generate an array of dates for the current week view
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

  // Generate time slots from 7:00 to 20:00 in 30-minute intervals
  const timeSlots = Array.from({ length: 27 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minutes = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTimeSlot(undefined);
  };

  const handleTimeSlotSelect = async (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    
    if (date) {
      const [hours, minutes] = timeSlot.split(':').map(Number);
      const dateWithTime = new Date(date);
      dateWithTime.setHours(hours, minutes);
      
      try {
        await addToGoogleCalendar(
          dateWithTime,
          "Regular Cleaning",
          2,
          "Address will be provided"
        );
        toast.success("Event added to Google Calendar!");
      } catch (error) {
        console.error("Failed to add event to Google Calendar:", error);
        toast.error("Failed to add event to Google Calendar. Please try again.");
      }
    }
  };

  const handlePreviousWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, 7));
  };

  // Get the month(s) to display
  const startMonth = format(weekDates[0], 'MMMM');
  const endMonth = format(weekDates[6], 'MMMM');
  const monthDisplay = startMonth === endMonth ? startMonth : `${startMonth}/${endMonth}`;

  return (
    <div className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Select a date and time for first cleaning
      </h3>

      <div className="space-y-6">
        {/* Horizontal Date Picker */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousWeek}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">
              {monthDisplay}
            </span>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-6">
            {weekDates.map((day, index) => (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                disabled={day.getDay() === 0 || day < new Date()}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-colors",
                  date && day.toDateString() === date.toDateString()
                    ? "bg-primary text-white"
                    : day.getDay() === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <span className="text-xs font-medium">
                  {format(day, 'EEE')}
                </span>
                <span className="text-lg font-semibold">
                  {format(day, 'd')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots Grid */}
        <div className="grid grid-cols-7 gap-2">
          {timeSlots.map((timeSlot) => {
            const isAvailable = Math.random() > 0.5; // Simulate availability
            return (
              <button
                key={timeSlot}
                onClick={() => isAvailable && handleTimeSlotSelect(timeSlot)}
                disabled={!isAvailable}
                className={cn(
                  "py-2 px-3 text-sm font-medium rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  selectedTimeSlot === timeSlot
                    ? "bg-primary text-white"
                    : isAvailable
                    ? "bg-white hover:bg-gray-50 text-gray-900 dark:bg-dark-background dark:hover:bg-gray-800 dark:text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                )}
              >
                {timeSlot}
              </button>
            );
          })}
        </div>
      </div>
      
      {!selectedTimeSlot && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          If there are no preferred time slots available, please select another date or{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-primary hover:underline">
                contact us
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p>Email: info@kleaners.de</p>
                  <p>Phone: +49 123 456 789</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      )}
    </div>
  );
};

export default Calendar;
