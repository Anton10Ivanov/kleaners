
import React, { useState, useEffect } from 'react';
import { BookingsTable } from '@/components/admin/sections/bookings/BookingsTable';
import { Booking, BookingStatus } from '@/components/admin/sections/bookings/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { getFilteredMockBookings, updateMockBooking } from '@/utils/mock/mockDataService';
import { BookingStatus as AppBookingStatus } from '@/types/enums';
import { AssignProviderDialog } from './AssignProviderDialog';

interface AssignProviderData {
  bookingId: string;
  providerId: string;
}

interface PendingBookingsPoolProps {
  pendingBookings?: Booking[];
  refreshData: () => void;
  isProviderView?: boolean;
}

export const PendingBookingsPool: React.FC<PendingBookingsPoolProps> = ({
  pendingBookings: externalPendingBookings,
  refreshData,
  isProviderView = false
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
    
    // For providers, reveal client information upon viewing details
    if (isProviderView) {
      toast.success("Client information is now available");
    }
  };

  const handleContactClient = (booking: Booking) => {
    console.log('Contact client for booking:', booking);
  };

  const handleAssignProvider = (data: AssignProviderData) => {
    updateMockBooking(data.bookingId, { 
      provider_id: data.providerId,
      status: AppBookingStatus.Assigned
    });
    
    setPendingBookings(prev => prev.filter(booking => booking.id !== data.bookingId));
    
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

  const handleAcceptJob = (id: string) => {
    updateMockBooking(id, { 
      status: AppBookingStatus.Confirmed,
      provider_id: "current-provider-id" // In production, this would be the current provider's ID
    });
    
    setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success("Job accepted successfully. You can now see client details.");
    refreshData();
  };

  const handleRejectJob = (id: string) => {
    // Just remove from provider's view, not actually deleting or changing status
    setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success("Job rejected successfully");
    refreshData();
  };

  if (pendingBookings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No pending bookings</h3>
          <p className="text-muted-foreground max-w-md">
            There are currently no bookings waiting for {isProviderView ? 'acceptance' : 'provider assignment'}. 
            New bookings from clients will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  // For provider view, use a simpler layout with just the option to accept or reject
  if (isProviderView) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Jobs</CardTitle>
          <CardDescription>
            New booking requests for your service area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{booking.service_type?.replace('_', ' ')}</h3>
                    <p className="text-sm text-right">${booking.total_price?.toFixed(2)}</p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">{new Date(booking.date || '').toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground truncate">{booking.address}</p>
                  </div>
                  
                  <div className="flex justify-between gap-2 mt-4">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAcceptJob(booking.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept Job
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleRejectJob(booking.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
    );
  }
  
  // Admin view with full functionality
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
