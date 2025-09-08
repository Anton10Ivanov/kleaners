
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Booking, BookingStatus } from '../types';

interface ActionMenuProps {
  booking: Booking;
  viewDetails: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  onAssignProvider: (booking: Booking) => void;
  onContactClient: (booking: Booking) => void;
  onDeleteBooking: (booking: Booking) => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  booking,
  viewDetails,
  updateBookingStatus,
  onAssignProvider,
  onContactClient,
  onDeleteBooking,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 card-spacing-none">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => viewDetails(booking)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onAssignProvider(booking)}
        >
          Assign provider
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onContactClient(booking)}
        >
          Contact client
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
          disabled={booking.status === 'confirmed'}
        >
          Mark as confirmed
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateBookingStatus(booking.id, 'completed')}
          disabled={booking.status === 'completed'}
        >
          Mark as completed
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
          disabled={booking.status === 'cancelled'}
          className="text-red-600 focus:text-red-600"
        >
          Cancel booking
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDeleteBooking(booking)}
          className="text-red-600 focus:text-red-600"
        >
          Delete booking
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
