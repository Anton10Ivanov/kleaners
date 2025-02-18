
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

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPreviousWeek}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium">
          {monthDisplay}
        </span>
        <button
          onClick={onNextWeek}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-6">
        {weekDates.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onDateSelect(day)}
            disabled={
              day.getDay() === 0 || 
              isBefore(day, nowInBerlin) || 
              isAfter(day, futureLimit)
            }
            className={cn(
              "flex flex-col items-center p-2 rounded-lg transition-colors",
              date && day.toDateString() === date.toDateString()
                ? "bg-primary text-white"
                : day.getDay() === 0 || isBefore(day, nowInBerlin)
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
  );
};
