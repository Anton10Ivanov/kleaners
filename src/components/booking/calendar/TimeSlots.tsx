
import { cn } from "@/lib/utils";
import { isBefore } from "date-fns";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeSlotsProps {
  timeSlots: string[];
  selectedTimeSlot: string | undefined;
  date: Date | undefined;
  nowInBerlin: Date;
  onTimeSlotSelect: (timeSlot: string) => void;
}

export const TimeSlots = ({
  timeSlots,
  selectedTimeSlot,
  date,
  nowInBerlin,
  onTimeSlotSelect
}: TimeSlotsProps) => {
  const [busyPeriods, setBusyPeriods] = useState<Array<{ start: string; end: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!date) return;

      setIsLoading(true);
      setError(null);

      try {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const { data, error } = await supabase.functions.invoke('fetch-calendar-availability', {
          body: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });

        if (error) throw error;

        console.log('Calendar availability response:', data);
        setBusyPeriods(data.busyPeriods || []);
      } catch (err) {
        console.error('Error fetching calendar availability:', err);
        setError('Failed to fetch availability. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [date]);

  const isTimeSlotAvailable = (timeSlot: string) => {
    if (!date) return false;
    
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hours, minutes, 0, 0);
    
    // Check if slot is in the past
    if (isBefore(slotDateTime, nowInBerlin)) return false;

    // Check if slot overlaps with any busy period
    return !busyPeriods.some(period => {
      const start = new Date(period.start);
      const end = new Date(period.end);
      return slotDateTime >= start && slotDateTime < end;
    });
  };

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 27 }).map((_, index) => (
          <Skeleton 
            key={index}
            className="h-10 w-full rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {timeSlots.map((timeSlot) => {
        const isAvailable = isTimeSlotAvailable(timeSlot);
        return (
          <button
            key={timeSlot}
            onClick={() => isAvailable && onTimeSlotSelect(timeSlot)}
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
  );
};
