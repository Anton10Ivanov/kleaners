
<<<<<<< HEAD
import React, { useState, memo, useCallback } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
import { UserBooking } from '@/types/bookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import { BookingDetails } from './BookingDetails';
import { ReschedulingDialog } from './ReschedulingDialog';
import { CancellationDialog } from './CancellationDialog';
import { InvoiceButton } from './InvoiceButton';
import { BookingStatus } from '@/types/enums';

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
<<<<<<< HEAD
export const BookingCard = memo(function BookingCard({
=======
export function BookingCard({
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
  booking,
  onCancel,
  onReschedule
}: BookingCardProps): JSX.Element {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    booking.date ? new Date(booking.date) : undefined
  );
  
  // Handle booking cancellation
<<<<<<< HEAD
  const handleCancel = useCallback(async () => {
=======
  const handleCancel = async () => {
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    setIsCancelling(true);
    try {
      await onCancel();
    } finally {
      setIsCancelling(false);
    }
<<<<<<< HEAD
  }, [onCancel]);
  
  // Handle booking rescheduling
  const handleReschedule = useCallback(async () => {
=======
  };
  
  // Handle booking rescheduling
  const handleReschedule = async () => {
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    if (!selectedDate) return;
    
    setIsRescheduling(true);
    try {
      const formattedDate = selectedDate.toISOString();
      await onReschedule(formattedDate);
    } finally {
      setIsRescheduling(false);
    }
<<<<<<< HEAD
  }, [selectedDate, onReschedule]);
=======
  };
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-between items-start">
          <h3 className="text-lg font-semibold">{booking.service}</h3>
          <StatusBadge status={booking.status} />
        </div>
        
        <BookingDetails booking={booking} />
        
        {/* Show invoice button for completed bookings */}
        {booking.status === BookingStatus.Completed && (
          <div className="mt-4 border-t pt-4 border-gray-100 dark:border-gray-800">
            <p className="text-sm mb-2 font-medium text-gray-700 dark:text-gray-300">Booking Documents</p>
            <InvoiceButton bookingId={booking.id} />
          </div>
        )}
      </CardContent>
      
      {/* Only show these actions for pending bookings */}
      {booking.status === BookingStatus.Pending && (
        <CardFooter className="flex justify-between pt-0 pb-4">
          {/* Reschedule Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Reschedule</Button>
            </DialogTrigger>
            <ReschedulingDialog
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleReschedule={handleReschedule}
              isRescheduling={isRescheduling}
            />
          </Dialog>
          
          {/* Cancel Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">Cancel Booking</Button>
            </DialogTrigger>
            <CancellationDialog
              handleCancel={handleCancel}
              isCancelling={isCancelling}
            />
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
<<<<<<< HEAD
});
=======
}
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
