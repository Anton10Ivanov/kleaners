
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Booking, BookingStatus } from '../types';
import { getFilteredMockBookings, updateMockBooking } from '@/utils/mock/mockDataService';
import { BookingStatus as AppBookingStatus } from '@/types/enums';

export const usePendingBookings = (externalPendingBookings?: Booking[]) => {
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
  };

  const handleDeleteBooking = (id: string) => {
    console.log(`Deleting booking ${id}`);
    setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success("Booking deleted successfully");
  };

  const handleViewDetails = (booking: Booking) => {
    console.log('View booking details:', booking);
    
    // For providers, reveal client information upon viewing details
    if (booking.provider_id) {
      toast.success("Client information is now available");
    }
  };

  const handleContactClient = (booking: Booking) => {
    console.log('Contact client for booking:', booking);
  };

  const handleAssignProvider = (data: { bookingId: string, providerId: string }) => {
    updateMockBooking(data.bookingId, { 
      provider_id: data.providerId,
      status: AppBookingStatus.Assigned
    });
    
    setPendingBookings(prev => prev.filter(booking => booking.id !== data.bookingId));
    
    setIsAssignDialogOpen(false);
    setSelectedBooking(null);
    
    toast.success("Provider assigned successfully");
  };

  const handleAssignClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
  };

  const refreshBookings = () => {
    const bookings = getFilteredMockBookings(AppBookingStatus.Pending);
    setPendingBookings(bookings);
  };

  const handleAcceptJob = (id: string) => {
    updateMockBooking(id, { 
      status: AppBookingStatus.Confirmed,
      provider_id: "current-provider-id" // In production, this would be the current provider's ID
    });
    
    setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success("Job accepted successfully. You can now see client details.");
  };

  const handleRejectJob = (id: string) => {
    // Just remove from provider's view, not actually deleting or changing status
    setPendingBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success("Job rejected successfully");
  };

  return {
    pendingBookings,
    sortField,
    sortOrder,
    isAssignDialogOpen,
    selectedBooking,
    handleToggleSort,
    handleUpdateBookingStatus,
    handleDeleteBooking,
    handleViewDetails,
    handleContactClient,
    handleAssignProvider,
    handleAssignClick,
    refreshBookings,
    handleAcceptJob,
    handleRejectJob,
    setIsAssignDialogOpen
  };
};
