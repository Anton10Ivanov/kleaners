import React, { useState, useEffect } from 'react';
import { format, isBefore, isAfter, addDays, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useMediaQuery } from '@/hooks/use-media-query';
import { UnifiedCalendar, CleanerSchedule, BookingRule, TimeSlot } from './UnifiedCalendar';

interface FormCalendarProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  timeSlot?: string;
  onTimeSlotChange?: (timeSlot: string | undefined) => void;
  cleaners: CleanerSchedule[];
  bookingRules: BookingRule;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showTimeSlots?: boolean;
  required?: boolean;
  error?: string;
}

export const FormCalendar: React.FC<FormCalendarProps> = ({
  value,
  onChange,
  timeSlot,
  onTimeSlotChange,
  cleaners,
  bookingRules,
  placeholder = "Select date and time",
  disabled = false,
  className,
  showTimeSlots = true,
  required = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(timeSlot);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Sync with external value changes
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  useEffect(() => {
    setSelectedTimeSlot(timeSlot);
  }, [timeSlot]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange(date);
    if (!date) {
      setSelectedTimeSlot(undefined);
      onTimeSlotChange?.(undefined);
    }
  };

  const handleTimeSlotSelect = (slot: string | undefined) => {
    setSelectedTimeSlot(slot);
    onTimeSlotChange?.(slot);
  };

  const formatDisplayValue = () => {
    if (!selectedDate) return placeholder;
    
    const dateStr = format(selectedDate, 'MMM d, yyyy');
    if (selectedTimeSlot && showTimeSlots) {
      return `${dateStr} at ${selectedTimeSlot}`;
    }
    return dateStr;
  };

  const isDateValid = (date: Date): boolean => {
    const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
    const futureLimit = addDays(nowInBerlin, bookingRules.maxAdvanceDays);
    
    return !isBefore(date, startOfDay(nowInBerlin)) && 
           !isAfter(date, futureLimit) &&
           cleaners.some(cleaner => 
             !cleaner.blockedDates.includes(format(date, 'yyyy-MM-dd')) &&
             cleaner.availableSlots.length > 0
           );
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
              error && "border-red-500 focus:border-red-500",
              selectedDate && "text-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayValue()}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn(
            "w-auto p-0",
            isMobile ? "w-[95vw] max-w-[400px]" : "w-[600px]"
          )}
          align="start"
        >
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <UnifiedCalendar
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onDateSelect={handleDateSelect}
                onTimeSlotSelect={handleTimeSlotSelect}
                cleaners={cleaners}
                bookingRules={bookingRules}
                disabled={disabled}
                showTimeSlots={showTimeSlots}
                showCleanerAvailability={false}
                className="border-0"
              />
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
      
      {error && (
        <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
};

// Compact version for mobile
export const MobileFormCalendar: React.FC<FormCalendarProps> = (props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  if (isMobile) {
    return (
      <div className="space-y-4">
        <FormCalendar {...props} showTimeSlots={false} />
        {props.showTimeSlots && props.value && (
          <div className="mt-4">
            <TimeSlotSelector
              selectedDate={props.value}
              selectedTimeSlot={props.timeSlot}
              onTimeSlotSelect={props.onTimeSlotChange}
              cleaners={props.cleaners}
              bookingRules={props.bookingRules}
            />
          </div>
        )}
      </div>
    );
  }
  
  return <FormCalendar {...props} />;
};

// Time slot selector component
interface TimeSlotSelectorProps {
  selectedDate: Date;
  selectedTimeSlot?: string;
  onTimeSlotSelect: (timeSlot: string | undefined) => void;
  cleaners: CleanerSchedule[];
  bookingRules: BookingRule;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedDate,
  selectedTimeSlot,
  onTimeSlotSelect,
  cleaners,
  bookingRules
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Generate time slots for the selected date
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = bookingRules.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = bookingRules.workingHours.end.split(':').map(Number);
    
    const startTime = new Date(selectedDate);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(selectedDate);
    endTime.setHours(endHour, endMinute, 0, 0);
    
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + bookingRules.slotDuration * 60000);
      
      if (slotEnd <= endTime) {
        const startTimeStr = format(currentTime, 'HH:mm');
        const endTimeStr = format(slotEnd, 'HH:mm');
        const slotId = `${format(selectedDate, 'yyyy-MM-dd')}-${startTimeStr}-${endTimeStr}`;
        
        const availableCleaners = cleaners.filter(cleaner => {
          const slotKey = `${startTimeStr}-${endTimeStr}`;
          return cleaner.availableSlots.includes(slotKey) && 
                 !cleaner.blockedDates.includes(format(selectedDate, 'yyyy-MM-dd'));
        });
        
        const isAvailable = availableCleaners.length > 0;
        
        slots.push({
          id: slotId,
          startTime: startTimeStr,
          endTime: endTimeStr,
          isAvailable,
          maxCleaners: cleaners.length,
          currentBookings: 0,
          cleanerName: availableCleaners[0]?.name
        });
      }
      
      currentTime = new Date(currentTime.getTime() + (bookingRules.slotDuration + bookingRules.breakDuration) * 60000);
    }
    
    setTimeSlots(slots);
  }, [selectedDate, cleaners, bookingRules]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span className="font-medium">Select Time</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onTimeSlotSelect(slot.isAvailable ? `${slot.startTime}-${slot.endTime}` : undefined)}
            disabled={!slot.isAvailable}
            className={cn(
              "p-3 text-sm border rounded-lg transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selectedTimeSlot === `${slot.startTime}-${slot.endTime}` && 
              "border-primary bg-primary/5 text-primary",
              slot.isAvailable && 
              "border-green-200 bg-green-50 hover:bg-green-100",
              !slot.isAvailable && 
              "border-red-200 bg-red-50 text-red-500"
            )}
          >
            <div className="font-medium">
              {slot.startTime} - {slot.endTime}
            </div>
            {slot.cleanerName && (
              <div className="text-xs text-muted-foreground">
                {slot.cleanerName}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormCalendar;
