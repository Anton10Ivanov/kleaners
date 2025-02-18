
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [hasPets, setHasPets] = useState(false);

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

  return (
    <div className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-200">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Select a date and time for first cleaning
      </h3>
      
      <div className="flex items-center gap-2 mb-6">
        <Checkbox
          id="hasPets"
          checked={hasPets}
          onCheckedChange={(checked) => setHasPets(checked as boolean)}
        />
        <label 
          htmlFor="hasPets"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have pets
        </label>
      </div>

      <div className="space-y-6">
        {/* Horizontal Date Picker */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {/* Handle previous week */}}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium">
              {date ? format(date, 'MMMM') : 'Select a date'}
            </span>
            <button
              onClick={() => {/* Handle next week */}}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div 
                key={day}
                className={cn(
                  "py-2 text-sm font-medium",
                  i === 6 ? "text-gray-400" : "text-gray-900 dark:text-white"
                )}
              >
                {day}
              </div>
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
          <a href="#" className="text-primary hover:underline">contact us</a>.
        </p>
      )}
    </div>
  );
};

export default Calendar;
