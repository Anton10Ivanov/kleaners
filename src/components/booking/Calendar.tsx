
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addToGoogleCalendar } from "@/utils/googleCalendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";

interface CalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const Calendar = ({ date, setDate }: CalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();

  // Generate time slots from 8:00 to 19:00 in 30-minute intervals
  const timeSlots = Array.from({ length: 23 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minutes = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  });

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTimeSlot(undefined); // Reset time slot when date changes
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
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Select a date and time</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-dark-primary/5 pointer-events-none" />
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            showOutsideDays={true}
            className="p-3"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium text-gray-900 dark:text-white",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-gray-500 dark:text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/10 dark:[&:has([aria-selected])]:bg-dark-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
              ),
              day_selected: "bg-primary dark:bg-dark-primary text-primary-foreground dark:text-white hover:bg-primary hover:text-primary-foreground dark:hover:bg-dark-primary",
              day_today: "bg-accent/20 dark:bg-dark-surface text-accent-foreground dark:text-white font-semibold",
              day_outside: "text-gray-400 dark:text-gray-600 opacity-50",
              day_disabled: "text-gray-400 dark:text-gray-600 opacity-50 hover:bg-transparent cursor-not-allowed",
              day_range_middle: "aria-selected:bg-accent dark:aria-selected:bg-dark-surface aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            }}
          />
        </div>

        <div className={cn(
          "transition-opacity duration-200",
          date ? "opacity-100" : "opacity-50 pointer-events-none"
        )}>
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {date ? `Available times for ${format(date, 'MMMM d, yyyy')}` : 'Select a date first'}
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2">
            {timeSlots.map((timeSlot) => (
              <button
                key={timeSlot}
                onClick={() => handleTimeSlotSelect(timeSlot)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  "border border-gray-200 dark:border-gray-700",
                  "hover:border-primary/50 dark:hover:border-primary/50",
                  selectedTimeSlot === timeSlot
                    ? "bg-primary text-white dark:bg-primary dark:text-white border-primary"
                    : "bg-white text-gray-700 dark:bg-dark-background dark:text-gray-300"
                )}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4 italic">
        Note: We don't work on Sundays. Available times are from 8:00 AM to 7:00 PM.
      </p>
    </div>
  );
};

export default Calendar;
