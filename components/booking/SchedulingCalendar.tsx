'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { format, addDays, startOfDay } from 'date-fns';
import { getAvailableTimeSlots, formatPrice } from '@/utils/1bookingCalculations';
import { BookingSchedule, TimeSlot, CalendarAvailability } from '@/types/bookingFlow';

interface SchedulingCalendarProps {
  onScheduleSelect: (schedule: BookingSchedule) => void;
  onBack: () => void;
  estimate: {
    totalPrice: number;
    recommendedHours: number;
  };
  serviceType: 'home' | 'office';
}

export const SchedulingCalendar: React.FC<SchedulingCalendarProps> = ({
  onScheduleSelect,
  onBack,
  estimate,
  serviceType
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [availableDates, setAvailableDates] = useState<CalendarAvailability[]>([]);

  // Generate available dates for the next 30 days
  useEffect(() => {
    const dates: CalendarAvailability[] = [];
    const today = startOfDay(new Date());
    
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      const timeSlots = getAvailableTimeSlots(date);
      
      // Simulate some unavailable dates (weekends, holidays, etc.)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isHoliday = false; // In real implementation, check against holiday calendar
      
      dates.push({
        date: date.toISOString().split('T')[0],
        availableSlots: timeSlots,
        isFullyBooked: isWeekend || isHoliday,
        isHoliday
      });
    }
    
    setAvailableDates(dates);
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time selection when date changes
  };

  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      const schedule: BookingSchedule = {
        date: selectedDate,
        timeSlot: selectedTimeSlot.time
      };
      onScheduleSelect(schedule);
    }
  };

  const getDateStatus = (date: CalendarAvailability) => {
    if (date.isHoliday) return 'holiday';
    if (date.isFullyBooked) return 'unavailable';
    return 'available';
  };

  const getDateBadge = (date: CalendarAvailability) => {
    const status = getDateStatus(date);
    switch (status) {
      case 'holiday':
        return <Badge variant="destructive" className="text-xs">Holiday</Badge>;
      case 'unavailable':
        return <Badge variant="secondary" className="text-xs">Unavailable</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Available</Badge>;
    }
  };

  const selectedDateAvailability = selectedDate 
    ? availableDates.find(d => d.date === selectedDate.toISOString().split('T')[0]) || null
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date & Time
              </CardTitle>
              <p className="text-muted-foreground">
                Choose your preferred cleaning date and time slot
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Available Dates</h3>
                <div className="grid grid-cols-7 gap-2">
                  {availableDates.map((dateAvailability) => {
                    const date = new Date(dateAvailability.date);
                    const isSelected = selectedDate && 
                      date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
                    const status = getDateStatus(dateAvailability);
                    const isClickable = status === 'available';
                    
                    return (
                      <motion.div
                        key={dateAvailability.date}
                        whileHover={isClickable ? { scale: 1.05 } : {}}
                        whileTap={isClickable ? { scale: 0.95 } : {}}
                      >
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`w-full h-16 flex flex-col items-center justify-center p-2 ${
                            !isClickable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                          onClick={() => isClickable && handleDateSelect(date)}
                          disabled={!isClickable}
                        >
                          <div className="text-sm font-medium">
                            {format(date, 'MMM')}
                          </div>
                          <div className="text-lg font-bold">
                            {format(date, 'd')}
                          </div>
                          <div className="text-xs">
                            {format(date, 'EEE')}
                          </div>
                        </Button>
                        <div className="mt-1 text-center">
                          {getDateBadge(dateAvailability)}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedDate && selectedDateAvailability && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold">Available Time Slots</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDateAvailability.availableSlots.map((timeSlot) => {
                      const isSelected = selectedTimeSlot?.id === timeSlot.id;
                      const isRecommended = timeSlot.isRecommended;
                      
                      return (
                        <motion.div
                          key={timeSlot.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            className={`w-full h-12 flex items-center justify-center gap-2 ${
                              isRecommended ? 'ring-2 ring-primary/20' : ''
                            }`}
                            onClick={() => handleTimeSelect(timeSlot)}
                          >
                            <Clock className="h-4 w-4" />
                            {timeSlot.time}
                            {isRecommended && (
                              <Badge variant="secondary" className="text-xs">
                                Recommended
                              </Badge>
                            )}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Service Details */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium capitalize">{serviceType} Cleaning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{estimate.recommendedHours} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-medium">
                    {serviceType === 'home' ? '$50' : '$60'}/hour
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Price:</span>
                  <span className="text-primary">{formatPrice(estimate.totalPrice)}</span>
                </div>
              </div>

              {/* Selected Schedule */}
              {selectedDate && selectedTimeSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Selected Schedule</span>
                  </div>
                  <div className="text-sm">
                    <div>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</div>
                    <div className="text-muted-foreground">{selectedTimeSlot.time}</div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="w-full"
                  size="lg"
                >
                  Confirm Booking
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="w-full"
                >
                  Back to Estimate
                </Button>
              </div>

              {/* Additional Info */}
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>You'll be redirected to payment after confirmation</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Booking can be modified up to 24 hours before</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
