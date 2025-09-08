import React, { useState, useEffect, useMemo } from 'react';
import { format, isBefore, isAfter, addDays, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Calendar, Clock, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMediaQuery } from '@/hooks/use-media-query';

// Types
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  cleanerId?: string;
  cleanerName?: string;
  maxCleaners: number;
  currentBookings: number;
}

export interface CleanerSchedule {
  id: string;
  name: string;
  availableSlots: string[]; // Array of time slots like "08:00-10:00"
  blockedDates: string[]; // Array of dates in YYYY-MM-DD format
  maxDailyBookings: number;
}

export interface BookingRule {
  minAdvanceHours: number;
  maxAdvanceDays: number;
  workingHours: {
    start: string; // "08:00"
    end: string;   // "20:00"
  };
  slotDuration: number; // in minutes
  breakDuration: number; // in minutes between slots
}

export interface UnifiedCalendarProps {
  selectedDate?: Date;
  selectedTimeSlot?: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeSlotSelect: (timeSlot: string | undefined) => void;
  cleaners: CleanerSchedule[];
  bookingRules: BookingRule;
  className?: string;
  disabled?: boolean;
  showTimeSlots?: boolean;
  showCleanerAvailability?: boolean;
}

// Default booking rules
const DEFAULT_BOOKING_RULES: BookingRule = {
  minAdvanceHours: 2,
  maxAdvanceDays: 30,
  workingHours: {
    start: "08:00",
    end: "20:00"
  },
  slotDuration: 120, // 2 hours
  breakDuration: 30  // 30 minutes
};

export const UnifiedCalendar: React.FC<UnifiedCalendarProps> = ({
  selectedDate,
  selectedTimeSlot,
  onDateSelect,
  onTimeSlotSelect,
  cleaners = [],
  bookingRules = DEFAULT_BOOKING_RULES,
  className,
  disabled = false,
  showTimeSlots = true,
  showCleanerAvailability = true
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Get current time in Berlin timezone
  const nowInBerlin = toZonedTime(new Date(), 'Europe/Berlin');
  const futureLimit = addDays(nowInBerlin, bookingRules.maxAdvanceDays);

  // Generate time slots for a given date
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = bookingRules.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = bookingRules.workingHours.end.split(':').map(Number);
    
    const startTime = new Date(date);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(endHour, endMinute, 0, 0);
    
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + bookingRules.slotDuration * 60000);
      
      if (slotEnd <= endTime) {
        const startTimeStr = format(currentTime, 'HH:mm');
        const endTimeStr = format(slotEnd, 'HH:mm');
        const slotId = `${format(date, 'yyyy-MM-dd')}-${startTimeStr}-${endTimeStr}`;
        
        // Check if this slot is available for any cleaner
        const availableCleaners = cleaners.filter(cleaner => {
          const slotKey = `${startTimeStr}-${endTimeStr}`;
          return cleaner.availableSlots.includes(slotKey) && 
                 !cleaner.blockedDates.includes(format(date, 'yyyy-MM-dd'));
        });
        
        const isAvailable = availableCleaners.length > 0 && 
                           currentTime > nowInBerlin &&
                           !isBefore(date, startOfDay(nowInBerlin));
        
        slots.push({
          id: slotId,
          startTime: startTimeStr,
          endTime: endTimeStr,
          isAvailable,
          maxCleaners: cleaners.length,
          currentBookings: 0, // This would come from actual booking data
          cleanerName: availableCleaners[0]?.name
        });
      }
      
      // Move to next slot with break duration
      currentTime = new Date(currentTime.getTime() + (bookingRules.slotDuration + bookingRules.breakDuration) * 60000);
    }
    
    return slots;
  };

  // Get time slots for selected date
  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return generateTimeSlots(selectedDate);
  }, [selectedDate, cleaners, bookingRules]);

  // Check if a date is available
  const isDateAvailable = (date: Date): boolean => {
    if (isBefore(date, startOfDay(nowInBerlin))) return false;
    if (isAfter(date, futureLimit)) return false;
    
    // Check if any cleaner is available on this date
    const dateStr = format(date, 'yyyy-MM-dd');
    return cleaners.some(cleaner => 
      !cleaner.blockedDates.includes(dateStr) &&
      cleaner.availableSlots.length > 0
    );
  };

  // Get availability info for a date
  const getDateAvailability = (date: Date) => {
    const slots = generateTimeSlots(date);
    const availableSlots = slots.filter(slot => slot.isAvailable);
    const totalCleaners = cleaners.length;
    const availableCleaners = cleaners.filter(cleaner => 
      !cleaner.blockedDates.includes(format(date, 'yyyy-MM-dd'))
    ).length;
    
    return {
      totalSlots: slots.length,
      availableSlots: availableSlots.length,
      totalCleaners,
      availableCleaners
    };
  };

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  }, [currentMonth]);

  const handleDateClick = (date: Date) => {
    if (disabled || !isDateAvailable(date)) return;
    onDateSelect(date);
    onTimeSlotSelect(undefined);
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    if (!timeSlot.isAvailable) return;
    onTimeSlotSelect(`${timeSlot.startTime}-${timeSlot.endTime}`);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">
          Select Date & Time
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousMonth}
            disabled={disabled}
          >
            ←
          </Button>
          <span className="text-sm font-medium min-w-[120px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextMonth}
            disabled={disabled}
          >
            →
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isAvailable = isDateAvailable(date);
          const isToday = isSameDay(date, nowInBerlin);
          const availability = getDateAvailability(date);
          
          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleDateClick(date)}
                    disabled={disabled || !isAvailable}
                    className={cn(
                      "relative p-2 h-12 text-sm rounded-lg transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      !isCurrentMonth && "text-muted-foreground/50",
                      isSelected && "bg-primary text-primary-foreground",
                      isToday && !isSelected && "bg-accent/20 text-accent-foreground",
                      isAvailable && !isSelected && "hover:bg-accent/50"
                    )}
                    onMouseEnter={() => setHoveredDate(date)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    <span className="block">{format(date, 'd')}</span>
                    {isAvailable && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <div className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</div>
                    {isAvailable ? (
                      <div className="text-green-600">
                        {availability.availableSlots} slots available
                      </div>
                    ) : (
                      <div className="text-red-600">Not available</div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Time Slots Section */}
      {showTimeSlots && selectedDate && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Available Times for {format(selectedDate, 'EEEE, MMMM d')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {timeSlots.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>No available time slots for this date</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <TooltipProvider key={slot.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleTimeSlotClick(slot)}
                          disabled={!slot.isAvailable}
                          className={cn(
                            "p-3 rounded-lg border text-left transition-all duration-200",
                            "hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
                            selectedTimeSlot === `${slot.startTime}-${slot.endTime}` && 
                            "border-primary bg-primary/5 text-primary",
                            slot.isAvailable && 
                            "border-green-200 bg-green-50 hover:bg-green-100",
                            !slot.isAvailable && 
                            "border-red-200 bg-red-50 text-red-500"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">
                                {slot.startTime} - {slot.endTime}
                              </div>
                              {showCleanerAvailability && (
                                <div className="text-sm text-muted-foreground">
                                  {slot.currentBookings}/{slot.maxCleaners} cleaners
                                </div>
                              )}
                            </div>
                            {slot.isAvailable ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          {slot.isAvailable ? (
                            <div>
                              <div className="font-medium">Available</div>
                              <div>{slot.cleanerName && `Cleaner: ${slot.cleanerName}`}</div>
                            </div>
                          ) : (
                            <div className="text-red-600">Fully booked</div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Cleaner Availability Summary */}
      {showCleanerAvailability && cleaners.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Cleaner Availability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cleaners.map((cleaner) => (
                <div key={cleaner.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{cleaner.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {cleaner.availableSlots.length} time slots
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Max {cleaner.maxDailyBookings} bookings/day
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnifiedCalendar;
