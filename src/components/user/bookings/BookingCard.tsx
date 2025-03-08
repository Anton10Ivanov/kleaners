
import React, { useState } from 'react';
import { UserBooking } from '@/hooks/useUserBookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, MapPin, DollarSign, X, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export interface BookingCardProps {
  /** Booking data with hours field */
  booking: UserBooking & { hours: number };
  
  /** Function to handle booking cancellation */
  onCancel: () => Promise<boolean>;
  
  /** Function to handle booking rescheduling */
  onReschedule: (newDate: string) => Promise<boolean>;
}

/**
 * BookingCard Component
 * 
 * Displays a single booking with actions
 * 
 * @param {BookingCardProps} props Component props
 * @returns {JSX.Element} Booking card component
 */
export function BookingCard({
  booking,
  onCancel,
  onReschedule
}: BookingCardProps): JSX.Element {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    booking.date ? new Date(booking.date) : undefined
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Format date for display
  const formattedDate = booking.date 
    ? format(new Date(booking.date), 'PPP')
    : 'Date not specified';
  
  // Format time for display
  const formattedTime = booking.date
    ? format(new Date(booking.date), 'p')
    : 'Time not specified';
  
  // Get status badge color
  const getStatusColor = () => {
    switch (booking.status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  // Get display status text
  const getStatusText = () => {
    if (booking.status === 'pending') {
      return 'Upcoming';
    }
    return booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  };
  
  // Handle booking cancellation
  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel();
    } finally {
      setIsCancelling(false);
    }
  };
  
  // Handle booking rescheduling
  const handleReschedule = async () => {
    if (!selectedDate) return;
    
    setIsRescheduling(true);
    try {
      const formattedDate = selectedDate.toISOString();
      await onReschedule(formattedDate);
      setCalendarOpen(false);
    } finally {
      setIsRescheduling(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-between items-start">
          <h3 className="text-lg font-semibold">{booking.service}</h3>
          <Badge className={cn("ml-2", getStatusColor())}>
            {getStatusText()}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{formattedTime} ({booking.hours} {booking.hours === 1 ? 'hour' : 'hours'})</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{booking.address}</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>${booking.price.toFixed(2)}</span>
          </div>
          
          {booking.providerName && (
            <div className="flex items-center">
              <span className="font-medium mr-2">Provider:</span>
              <span>{booking.providerName}</span>
            </div>
          )}
          
          {booking.notes && (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <p className="text-xs italic">{booking.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {booking.status === 'pending' && (
        <CardFooter className="flex justify-between pt-0 pb-4">
          {/* Reschedule Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Reschedule</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reschedule Booking</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select a new date and time
                    </label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="flex justify-between">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      onClick={handleReschedule}
                      disabled={!selectedDate || isRescheduling}
                    >
                      {isRescheduling ? "Rescheduling..." : "Confirm"}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Cancel Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">Cancel Booking</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Booking</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="mb-4">
                  Are you sure you want to cancel this booking? This action cannot be undone.
                </p>
                <div className="flex justify-between">
                  <DialogClose asChild>
                    <Button variant="outline">Keep Booking</Button>
                  </DialogClose>
                  <Button 
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={isCancelling}
                  >
                    {isCancelling ? "Cancelling..." : "Yes, Cancel"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
}
