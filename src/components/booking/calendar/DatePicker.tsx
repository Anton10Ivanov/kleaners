
import { format, isBefore, isAfter } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  weekDates: Date[];
  date: Date | undefined;
  nowInBerlin: Date;
  futureLimit: Date;
  weekStart: Date;
  onDateSelect: (date: Date | undefined) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export const DatePicker = ({
  weekDates,
  date,
  nowInBerlin,
  futureLimit,
  onDateSelect,
  onPreviousWeek,
  onNextWeek
}: DatePickerProps) => {
  const startMonth = format(weekDates[0], 'MMMM');
  const endMonth = format(weekDates[6], 'MMMM');
  const monthDisplay = startMonth === endMonth ? startMonth : `${startMonth}/${endMonth}`;

  // Sort weekDates to ensure Monday-Saturday order
  const sortedDates = [...weekDates].sort((a, b) => {
    const dayA = a.getDay() === 0 ? 7 : a.getDay(); // Convert Sunday (0) to 7
    const dayB = b.getDay() === 0 ? 7 : b.getDay();
    return dayA - dayB;
  });

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPreviousWeek}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-150"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium">
          {monthDisplay}
        </span>
        <button
          onClick={onNextWeek}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-150"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-6">
        {sortedDates.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onDateSelect(day)}
            disabled={
              day.getDay() === 0 || 
              isBefore(day, nowInBerlin) || 
              isAfter(day, futureLimit)
            }
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-150",
              date && day.toDateString() === date.toDateString()
                ? "bg-primary text-white"
                : day.getDay() === 0 || isBefore(day, nowInBerlin)
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-800",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <span className="text-xs font-medium text-center w-full">
              {format(day, 'EEE')}
            </span>
            <span className="text-lg font-semibold text-center w-full">
              {format(day, 'd')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

