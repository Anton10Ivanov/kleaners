
import React, { useState } from 'react';
import { UserBooking } from '@/types/bookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { StatusBadge } from './StatusBadge';
import { BookingDetails } from './BookingDetails';
import { ReschedulingDialog } from './ReschedulingDialog';
import { CancellationDialog } from './CancellationDialog';
import { InvoiceButton } from './InvoiceButton';
import { FileText } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';

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
    } finally {
      setIsRescheduling(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-between items-start">
          <h3 className="text-lg font-semibold">{booking.service}</h3>
          <StatusBadge status={booking.status} />
        </div>
        
        <BookingDetails booking={booking} />
        
        {/* Show invoice button for completed bookings */}
        {booking.status === 'completed' && (
          <div className="mt-4">
            <InvoiceButton bookingId={booking.id} />
          </div>
        )}
      </CardContent>
      
      {booking.status === 'pending' && (
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
}
