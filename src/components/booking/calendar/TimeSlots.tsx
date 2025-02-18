
import { cn } from "@/lib/utils";
import { isBefore } from "date-fns";

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
  const isTimeSlotAvailable = (timeSlot: string) => {
    if (!date) return false;
    
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hours, minutes);
    
    return !isBefore(slotDateTime, nowInBerlin) && Math.random() > 0.5;
  };

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
