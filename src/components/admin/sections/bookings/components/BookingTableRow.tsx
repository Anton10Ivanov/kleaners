
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Booking, BookingStatus, statusColors } from '../types';
import { format } from 'date-fns';
import { ActionMenu } from './ActionMenu';

interface BookingTableRowProps {
  booking: Booking;
  viewDetails: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  onAssignProvider: (booking: Booking) => void;
  onContactClient: (booking: Booking) => void;
  onDeleteBooking: (booking: Booking) => void;
}

export const BookingTableRow: React.FC<BookingTableRowProps> = ({
  booking,
  viewDetails,
  updateBookingStatus,
  onAssignProvider,
  onContactClient,
  onDeleteBooking,
}) => {
  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  return (
    <TableRow key={booking.id} className="cursor-pointer hover:bg-muted/50">
      <TableCell className="font-medium">{booking.date ? formatDate(booking.date) : 'N/A'}</TableCell>
      <TableCell>
        {booking.first_name && booking.last_name
          ? `${booking.first_name} ${booking.last_name}`
          : 'N/A'}
      </TableCell>
      <TableCell>{booking.service_type ? booking.service_type.replace('_', ' ') : 'N/A'}</TableCell>
      <TableCell className="max-w-[200px] truncate">{booking.address || 'N/A'}</TableCell>
      <TableCell>${booking.total_price ? booking.total_price.toFixed(2) : 'N/A'}</TableCell>
      <TableCell>
        <Badge className={`${booking.status ? statusColors[booking.status as BookingStatus] : ''}`}>
          {booking.status}
        </Badge>
      </TableCell>
      <TableCell>{booking.provider_id ? 'Assigned' : 'Unassigned'}</TableCell>
      <TableCell className="text-right">
        <ActionMenu
          booking={booking}
          viewDetails={viewDetails}
          updateBookingStatus={updateBookingStatus}
          onAssignProvider={onAssignProvider}
          onContactClient={onContactClient}
          onDeleteBooking={onDeleteBooking}
        />
      </TableCell>
    </TableRow>
  );
};
