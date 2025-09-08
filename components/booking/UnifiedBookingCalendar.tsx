'use client'

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { useScheduleData } from '@/hooks/useScheduleData';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { UnifiedCalendar } from '@/components/calendar/UnifiedCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, CheckCircle, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface UnifiedBookingCalendarProps {
  form: UseFormReturn<BookingFormData>;
  className?: string;
}

export const UnifiedBookingCalendar: React.FC<UnifiedBookingCalendarProps> = ({
  form,
  className
}) => {
  const { cleaners, bookingRules } = useScheduleData();
  const { getMobileSpacing, isMobile } = useMobileOptimizations();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>();

  // Watch form values
  const selectedDate = form.watch('date');
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode');

  const handleDateSelect = (date: Date | undefined) => {
    form.setValue('date', date);
    setSelectedTimeSlot(undefined);
    form.setValue('preferredTime', undefined);
    form.setValue('providerOptions', []);
  };

  const handleTimeSlotSelect = (timeSlot: string | undefined) => {
    setSelectedTimeSlot(timeSlot);
    form.setValue('preferredTime', timeSlot);
  };

  // Get available cleaners for selected date and time
  const getAvailableCleaners = () => {
    if (!selectedDate || !selectedTimeSlot) return [];
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    return cleaners.filter(cleaner => 
      cleaner.availableSlots.includes(selectedTimeSlot) &&
      !cleaner.blockedDates.includes(dateStr)
    );
  };

  const availableCleaners = getAvailableCleaners();

  return (
    <div className={className}>
      <Card className={cn("shadow-sm", isMobile && "card-primary")}>
        <CardHeader className={isMobile ? getMobileSpacing('md') : undefined}>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-primary" />
            Select Date & Time
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose your preferred date and time slot for cleaning service
          </p>
        </CardHeader>
        <CardContent className={isMobile ? getMobileSpacing('md') : undefined}>
          <UnifiedCalendar
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            onDateSelect={handleDateSelect}
            onTimeSlotSelect={handleTimeSlotSelect}
            cleaners={cleaners}
            bookingRules={bookingRules}
            showTimeSlots={true}
            showCleanerAvailability={true}
            className={isMobile ? "mx-auto" : undefined}
          />

          {/* Mobile-optimized Selected Date Display */}
          {selectedDate && isMobile && (
            <div className="mb-4 card-spacing-xs bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground">
                Selected Date: {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          )}

          {/* Mobile-optimized Selected Time Display */}
          {selectedTimeSlot && isMobile && (
            <div className="mt-4 card-spacing-xs bg-primary/10 rounded-lg">
              <p className="text-sm font-medium text-primary">
                Selected Time: {selectedTimeSlot}
              </p>
            </div>
          )}

          {/* Selected Details Summary */}
          {selectedDate && selectedTimeSlot && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  Selected Booking Details
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Date:</span>
                  <span>{selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Time:</span>
                  <span>{selectedTimeSlot}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Available Cleaners:</span>
                  <Badge variant="secondary" className="text-green-700">
                    {availableCleaners.length}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-medium">Duration:</span>
                  <span>{hours} hours</span>
                </div>
              </div>

              {availableCleaners.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                    Available Cleaners:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {availableCleaners.map((cleaner) => (
                      <Badge key={cleaner.id} variant="outline" className="text-green-700 border-green-300">
                        {cleaner.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Booking Rules Info */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              Booking Information
            </h5>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p>• Minimum advance booking: {bookingRules.minAdvanceHours} hours</p>
              <p>• Maximum advance booking: {bookingRules.maxAdvanceDays} days</p>
              <p>• Working hours: {bookingRules.workingHours.start} - {bookingRules.workingHours.end}</p>
              <p>• Slot duration: {bookingRules.slotDuration} minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedBookingCalendar;
