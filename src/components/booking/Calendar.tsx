import { useState } from "react";
import { addDays, format, isPast, isToday, setHours, setMinutes } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { TimeOption, generateTimeOptions } from "@/lib/time-utils";

interface CalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const Calendar = ({ form }: CalendarProps) => {
  // Get values and methods from form
  const date = form.watch('date');

  // State for time slots
  const [timeSlots] = useState<TimeOption[]>(generateTimeOptions());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date || undefined);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    form.setValue('date', date);
    
    // Reset time selection
    setSelectedTimeIndex(null);
    
    // If time was previously selected, clear it
    const currentDate = form.getValues('date');
    if (currentDate) {
      // Keep the same date but reset time
      const newDate = new Date(date);
      newDate.setHours(9, 0, 0, 0);
      form.setValue('date', newDate);
    }
  };

  // Handle time selection
  const handleTimeSelect = (timeOption: TimeOption, index: number) => {
    if (!selectedDate) return;

    setSelectedTimeIndex(index);
    
    // Set the time on the selected date
    const newDate = new Date(selectedDate);
    newDate.setHours(timeOption.hours);
    newDate.setMinutes(timeOption.minutes);
    
    form.setValue('date', newDate);
  };

  // Function to determine if a date should be disabled
  const disableDates = (date: Date) => {
    // Disable past dates and today (assuming same-day booking isn't allowed)
    return isPast(date) && !isToday(date);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Date</h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={disableDates}
              className="rounded-xl border-none"
              fromDate={new Date()}
              toDate={addDays(new Date(), 90)}
            />
          </div>
        </div>

        {/* Time Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Time</h3>
          
          {selectedDate ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((timeSlot, index) => {
                const dateTime = selectedDate ? 
                  setMinutes(setHours(new Date(selectedDate), timeSlot.hours), timeSlot.minutes) : 
                  null;
                
                const isDisabled = dateTime ? isPast(dateTime) : false;
                
                return (
                  <Button
                    key={index}
                    type="button"
                    variant={selectedTimeIndex === index ? "default" : "outline"}
                    className={`h-auto py-3 text-sm ${selectedTimeIndex === index ? 'bg-primary' : ''}`}
                    disabled={isDisabled}
                    onClick={() => handleTimeSelect(timeSlot, index)}
                  >
                    {timeSlot.label}
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
              <p className="text-subtext dark:text-gray-400 text-sm">Please select a date first</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom time input option */}
      <div className="pt-2">
        <div className="flex items-center gap-2">
          <div className="text-sm text-subtext dark:text-gray-400">Need a specific time?</div>
          <Input 
            type="time" 
            className="w-auto"
            onChange={(e) => {
              if (!selectedDate || !e.target.value) return;
              
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = new Date(selectedDate);
              newDate.setHours(hours, minutes);
              
              form.setValue('date', newDate);
              setSelectedTimeIndex(null);
            }}
          />
        </div>
      </div>

      {/* Show selected date and time */}
      {form.getValues('date') && (
        <div className="p-4 bg-primary/10 dark:bg-primary/5 rounded-xl text-center">
          <p className="font-medium">
            Selected: {format(form.getValues('date'), 'EEEE, MMMM d')} at {format(form.getValues('date'), 'h:mm a')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
