
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingsTable } from '../BookingsTable';
import { Booking, BookingStatus } from '../types';

interface AdminBookingsListProps {
  bookings: Booking[];
  sortField: 'date' | 'total_price' | 'created_at';
  sortOrder: 'asc' | 'desc';
  toggleSort: (field: 'date' | 'total_price' | 'created_at') => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  refreshData: () => void;
  viewDetails: (booking: Booking) => void;
  contactClient: (booking: Booking) => void;
}

export const AdminBookingsList: React.FC<AdminBookingsListProps> = ({
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Bookings Pool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <BookingsTable
            bookings={bookings}
            sortField={sortField}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
            updateBookingStatus={updateBookingStatus}
            deleteBooking={deleteBooking}
            refreshData={refreshData}
            viewDetails={viewDetails}
            contactClient={contactClient}
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={refreshData}
            className="text-sm"
          >
            Refresh List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
