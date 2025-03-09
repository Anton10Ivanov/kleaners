
import React, { useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { Booking, BookingStatus, SortField, SortOrder } from './types';
import { TableHeader } from './components/TableHeader';
import { BookingTableRow } from './components/BookingTableRow';
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  // Handler for assigning provider
  const handleAssignProvider = (bookingId: string, providerId: string) => {
    // This would normally call an API to assign the provider
    console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
    setIsAssignDialogOpen(false);
    refreshData();
  };

  const handleAssignProviderClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
  };

  const handleDeleteBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteDialogOpen(true);
  };

  const handleContactClientClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsMessageDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader 
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
        />
        <TableBody>
          {bookings.map((booking) => (
            <BookingTableRow
              key={booking.id}
              booking={booking}
              viewDetails={viewDetails}
              updateBookingStatus={updateBookingStatus}
              onAssignProvider={handleAssignProviderClick}
              onContactClient={handleContactClientClick}
              onDeleteBooking={handleDeleteBookingClick}
            />
          ))}
        </TableBody>
      </Table>

      {/* Assign Provider Dialog */}
      {selectedBooking && (
        <AssignProviderDialog
          open={isAssignDialogOpen}
          onClose={() => setIsAssignDialogOpen(false)}
          booking={selectedBooking}
          onAssign={handleAssignProvider}
        />
      )}

      {/* Delete Booking Dialog */}
      {selectedBooking && (
        <DeleteBookingDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={() => {
            deleteBooking(selectedBooking.id);
            setIsDeleteDialogOpen(false);
          }}
        />
      )}

      {/* Message Client Dialog */}
      {selectedBooking && (
        <MessageClientDialog
          open={isMessageDialogOpen}
          onClose={() => setIsMessageDialogOpen(false)}
          booking={selectedBooking}
          onMessageSent={() => {
            contactClient(selectedBooking);
            setIsMessageDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
