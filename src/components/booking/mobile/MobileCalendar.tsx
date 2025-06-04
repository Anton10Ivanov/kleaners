
import { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface MobileCalendarProps {
  form: UseFormReturn<BookingFormData>;
  onComplete?: () => void;
}

const MobileCalendar = ({ form, onComplete }: MobileCalendarProps) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const date = form.watch('date');
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');

  const weekStart = startOfWeek(addWeeks(nowInBerlin, weekOffset), { weekStartsOn: 1 });
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 })
  });

  const handleDateSelect = (selectedDate: Date) => {
    form.setValue('date', selectedDate);
    // Auto-advance when selection is made
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setWeekOffset(prev => prev + (direction === 'next' ? 1 : -1));
  };

  const isDateDisabled = (dateToCheck: Date) => {
    const oneWeekAgo = subDays(nowInBerlin, 7);
    const futureLimit = addDays(nowInBerlin, 31);
    return dateToCheck < oneWeekAgo || dateToCheck > futureLimit;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Pick a date</h3>
      </div>

      <Card className="overflow-hidden">
        {/* Week Navigation */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateWeek('prev')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="font-medium text-sm">
            {format(weekStart, 'MMM d')} - {format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'MMM d, yyyy')}
          </span>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateWeek('next')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Date Grid - Optimized for mobile */}
        <div className="grid grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700">
          {weekDates.map((weekDate, index) => {
            const isSelected = date && isSameDay(weekDate, date);
            const isDisabled = isDateDisabled(weekDate);
            const isToday = isSameDay(weekDate, nowInBerlin);
            
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isDisabled && handleDateSelect(weekDate)}
                disabled={isDisabled}
                className={`
                  h-16 p-2 text-center transition-all active:scale-95
                  ${isSelected ? 'bg-primary text-white' : ''}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'}
                  ${isToday && !isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {format(weekDate, 'EEE')}
                  </div>
                  <div className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {format(weekDate, 'd')}
                  </div>
                  {isToday && (
                    <div className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {date && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
        >
          Selected: <strong>{format(date, 'EEEE, MMM d, yyyy')}</strong>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MobileCalendar;
