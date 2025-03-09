
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Booking, BookingStatus, SortField, SortOrder, statusColors } from './types';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { AssignProviderDialog } from './AssignProviderDialog';
import { DeleteBookingDialog } from './DeleteBookingDialog';
import { MessageClientDialog } from './MessageClientDialog';

// Define prop types for the BookingsTable component
export interface BookingsTableProps {
  bookings: Booking[];
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  refreshData: () => void;
  viewDetails: (booking: Booking) => void;
  contactClient: (booking: Booking) => void;
}

export const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  sortField,
  sortOrder,
  toggleSort,
  updateBookingStatus,
  deleteBooking,
  refreshData,
  viewDetails,
  contactClient
}) => {
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = React.useState(false);

  // Handler for assigning provider
  const handleAssignProvider = (bookingId: string, providerId: string) => {
    // This would normally call an API to assign the provider
    console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
    setIsAssignDialogOpen(false);
    refreshData();
  };

  // Render the sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField === field) {
      return (
        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <Button
                variant="ghost"
                onClick={() => toggleSort('date')}
                className="font-medium flex items-center"
              >
                Date {renderSortIndicator('date')}
              </Button>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => toggleSort('total_price')}
                className="font-medium flex items-center"
              >
                Price {renderSortIndicator('total_price')}
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => viewDetails(booking)}>
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsAssignDialogOpen(true);
                      }}
                    >
                      Assign provider
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsMessageDialogOpen(true);
                      }}
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
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="text-red-600 focus:text-red-600"
                    >
                      Delete booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Assign Provider Dialog */}
      {selectedBooking && (
        <AssignProviderDialog
          isOpen={isAssignDialogOpen}
          onClose={() => setIsAssignDialogOpen(false)}
          booking={selectedBooking}
          onAssign={handleAssignProvider}
        />
      )}

      {/* Delete Booking Dialog */}
      {selectedBooking && (
        <DeleteBookingDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          booking={selectedBooking}
          onDelete={(id) => {
            deleteBooking(id);
            setIsDeleteDialogOpen(false);
          }}
        />
      )}

      {/* Message Client Dialog */}
      {selectedBooking && (
        <MessageClientDialog
          isOpen={isMessageDialogOpen}
          onClose={() => setIsMessageDialogOpen(false)}
          booking={selectedBooking}
          onSend={() => {
            contactClient(selectedBooking);
            setIsMessageDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
