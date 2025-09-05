
import { useState, useEffect } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useSwipeGesture, useHapticFeedback, useReducedMotion } from '@/hooks/useMobileInteractions';

interface AccessibleMobileCalendarProps {
  form: UseFormReturn<BookingFormData>;
  onComplete?: () => void;
}

const AccessibleMobileCalendar = ({ form, onComplete }: AccessibleMobileCalendarProps) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const date = form.watch('date');
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const { triggerHaptic } = useHapticFeedback();
  const prefersReducedMotion = useReducedMotion();

  const weekStart = startOfWeek(addWeeks(nowInBerlin, weekOffset), { weekStartsOn: 1 });
  const weekDates = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 })
  });

  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => navigateWeek('next'),
    onSwipeRight: () => navigateWeek('prev')
  });

  const handleDateSelect = (selectedDate: Date) => {
    form.setValue('date', selectedDate);
    triggerHaptic('medium');
    
    // Auto-advance when selection is made
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setWeekOffset(prev => prev + (direction === 'next' ? 1 : -1));
    triggerHaptic('light');
  };

  const isDateDisabled = (dateToCheck: Date) => {
    const oneWeekAgo = subDays(nowInBerlin, 7);
    const futureLimit = addDays(nowInBerlin, 31);
    return dateToCheck < oneWeekAgo || dateToCheck > futureLimit;
  };

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div {...animationProps} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold">Pick a date</h3>
      </div>

      <Card className="overflow-hidden">
        {/* Enhanced Week Navigation */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateWeek('prev')}
            className="h-10 w-10 p-0 touch-manipulation"
            aria-label="Previous week"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <div className="font-semibold text-base">
              {format(weekStart, 'MMM d')} - {format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'MMM d, yyyy')}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Swipe to navigate weeks
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateWeek('next')}
            className="h-10 w-10 p-0 touch-manipulation"
            aria-label="Next week"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Enhanced Date Grid with better accessibility */}
        <div 
          ref={swipeRef as any}
          className="grid grid-cols-7"
          role="grid"
          aria-label="Calendar dates"
        >
          {weekDates.map((weekDate, index) => {
            const isSelected = date && isSameDay(weekDate, date);
            const isDisabled = isDateDisabled(weekDate);
            const isToday = isSameDay(weekDate, nowInBerlin);
            
            return (
              <motion.button
                key={index}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onClick={() => !isDisabled && handleDateSelect(weekDate)}
                disabled={isDisabled}
                className={`
                  min-h-[72px] p-3 text-center transition-all touch-manipulation
                  border-r border-b border-gray-200 dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset
                  ${isSelected ? 'bg-primary text-white' : ''}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100'}
                  ${isToday && !isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  ${index === 6 ? 'border-r-0' : ''}
                `}
                role="gridcell"
                aria-label={`${format(weekDate, 'EEEE, MMMM d, yyyy')}${isToday ? ' (Today)' : ''}${isDisabled ? ' (Unavailable)' : ''}`}
                aria-selected={isSelected}
                aria-disabled={isDisabled}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                    {format(weekDate, 'EEE')}
                  </div>
                  <div className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {format(weekDate, 'd')}
                  </div>
                  {isToday && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </Card>

      {date && (
        <motion.div 
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
          role="status"
          aria-live="polite"
        >
          Selected: <strong>{format(date, 'EEEE, MMM d, yyyy')}</strong>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AccessibleMobileCalendar;
