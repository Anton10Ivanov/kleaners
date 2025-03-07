
import { useState, useEffect } from "react";
import { startOfWeek, addDays, eachDayOfInterval, format, isBefore, isAfter, isSameDay } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { cn } from "@/lib/utils";

interface MoveInOutCalendarProps {
  form: UseFormReturn<BookingFormData>;
}

const MoveInOutCalendar = ({
  form
}: MoveInOutCalendarProps) => {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), {
    weekStartsOn: 1
  }));
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const futureLimit = addDays(nowInBerlin, 31);
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  }).sort((a, b) => {
    const dayA = a.getDay() === 0 ? 7 : a.getDay();
    const dayB = b.getDay() === 0 ? 7 : b.getDay();
    return dayA - dayB;
  });

  // Update form whenever selectedDates changes
  useEffect(() => {
    if (selectedDates.length > 0) {
      form.setValue('selectedDates', selectedDates);
    }
  }, [selectedDates, form]);

  const handleDateSelect = (date: Date) => {
    setSelectedDates(prev => {
      const isSelected = prev.some(d => isSameDay(d, date));
      if (isSelected) {
        return prev.filter(d => !isSameDay(d, date));
      } else {
        return [...prev, date];
      }
    });
  };

  const handlePreviousWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(prevWeek => addDays(prevWeek, 7));
  };

  const startMonth = format(weekDates[0], 'MMMM');
  const endMonth = format(weekDates[6], 'MMMM');
  const monthDisplay = startMonth === endMonth ? startMonth : `${startMonth}/${endMonth}`;

  return <div className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">On which days you prefer the cleaning?</h3>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePreviousWeek} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-150">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium">
            {monthDisplay}
          </span>
          <button onClick={handleNextWeek} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-150">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-6">
          {weekDates.map(day => <button key={day.toISOString()} onClick={() => handleDateSelect(day)} disabled={day.getDay() === 0 || isBefore(day, nowInBerlin) || isAfter(day, futureLimit)} className={cn("flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-150", selectedDates.some(d => isSameDay(d, day)) ? "bg-primary text-white" : day.getDay() === 0 || isBefore(day, nowInBerlin) ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100 dark:hover:bg-gray-800", "disabled:opacity-50 disabled:cursor-not-allowed")}>
              <span className="text-xs font-medium text-center w-full">
                {format(day, 'EEE')}
              </span>
              <span className="text-lg font-semibold text-center w-full">
                {format(day, 'd')}
              </span>
            </button>)}
        </div>
      </div>

      {selectedDates.length > 0 && <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Order dates from most to least wanted:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map(date => <span key={date.toISOString()} className="text-sm bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
                {format(date, 'MMM d, yyyy')}
              </span>)}
          </div>
        </div>}
    </div>;
};

export default MoveInOutCalendar;
