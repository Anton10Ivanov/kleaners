import React, { useState, useEffect } from 'react';
import { BookingsTable } from '@/components/admin/sections/bookings/BookingsTable';
import { Booking, BookingStatus } from '@/components/admin/sections/bookings/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getFilteredMockBookings, updateMockBooking } from '@/utils/mock/mockDataService';
import { BookingStatus as AppBookingStatus } from '@/types/enums';
import { AssignProviderDialog } from './AssignProviderDialog';

interface PendingBookingsPoolProps {
  pendingBookings?: Booking[];
  refreshData: () => void;
}

export const PendingBookingsPool: React.FC<PendingBookingsPoolProps> = ({
  pendingBookings: externalPendingBookings,
  refreshData
}) => {
  const [sortField, setSortField] = useState<'date' | 'total_price' | 'created_at'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (externalPendingBookings) {
      setPendingBookings(externalPendingBookings);
    } else {
      const bookings = getFilteredMockBookings(AppBookingStatus.Pending);
      setPendingBookings(bookings);
    }
  }, [externalPendingBookings]);

  const handleToggleSort = (field: 'date' | 'total_price' | 'created_at') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleUpdateBookingStatus = (id: string, status: BookingStatus) => {
    console.log(`Updating booking ${id} status to ${status}`);
    
    updateMockBooking(id, { status });
    
    if (status !== AppBookingStatus.Pending) {
      setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    }
    
    toast.success(`Booking status updated to ${status}`);
    refreshData();
  };

  const handleDeleteBooking = (id: string) => {
    console.log(`Deleting booking ${id}`);
    setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success("Booking deleted successfully");
    refreshData();
  };

  const handleViewDetails = (booking: Booking) => {
    console.log('View booking details:', booking);
  };

  const handleContactClient = (booking: Booking) => {
    console.log('Contact client for booking:', booking);
  };

  const handleAssignProvider = (bookingId: string, providerId: string) => {
    updateMockBooking(bookingId, { 
      provider_id: providerId,
      status: AppBookingStatus.Assigned
    });
    
    setPendingBookings(prev => prev.filter(booking => booking.id !== bookingId));
    
    setIsAssignDialogOpen(false);
    setSelectedBooking(null);
    
    toast.success("Provider assigned successfully");
    refreshData();
  };

  const handleAssignClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
  };

  const handleRefreshBookings = () => {
    const bookings = getFilteredMockBookings(AppBookingStatus.Pending);
    setPendingBookings(bookings);
    refreshData();
  };

  if (pendingBookings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No pending bookings</h3>
          <p className="text-muted-foreground max-w-md">
            There are currently no bookings waiting for provider assignment. New bookings from clients will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Bookings Pool</CardTitle>
          <CardDescription>
            New bookings from clients waiting for provider assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <BookingsTable
              bookings={pendingBookings}
              sortField={sortField}
              sortOrder={sortOrder}
              toggleSort={handleToggleSort}
              updateBookingStatus={handleUpdateBookingStatus}
              deleteBooking={handleDeleteBooking}
              refreshData={handleRefreshBookings}
              viewDetails={handleViewDetails}
              contactClient={handleContactClient}
            />
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              onClick={handleRefreshBookings}
              className="text-sm"
            >
              Refresh List
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {selectedBooking && (
        <AssignProviderDialog
          open={isAssignDialogOpen}
          onClose={() => setIsAssignDialogOpen(false)}
          booking={selectedBooking}
          onAssign={handleAssignProvider}
        />
      )}
    </>
  );
};
