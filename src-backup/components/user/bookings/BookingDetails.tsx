
import React from 'react';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { UserBooking } from '@/types/bookings';

interface BookingDetailsProps {
  booking: UserBooking & { hours: number };
}

export function BookingDetails({ booking }: BookingDetailsProps): JSX.Element {
  // Format date for display
  const formattedDate = booking.date 
    ? format(new Date(booking.date), 'PPP')
    : 'Date not specified';
  
  // Format time for display
  const formattedTime = booking.date
    ? format(new Date(booking.date), 'p')
    : 'Time not specified';
    
  return (
    <div className="form-spacing-tight text-sm">
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
  );
}
