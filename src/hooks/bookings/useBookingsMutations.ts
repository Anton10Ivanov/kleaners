
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking, BookingStatus } from "@/components/admin/sections/bookings/types";
import { toast } from "sonner";
import { BookingsFilterParams, getBookingsQueryKey } from "./bookingsUtils";
import { addMockNotification } from "@/utils/mock/mockDataService";

// This would normally interact with an API
const updateBookingStatusApi = async ({
  id,
  status,
}: {
  id: string;
  status: BookingStatus;
}): Promise<Booking> => {
  console.log(`Updating booking ${id} status to ${status}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get existing bookings from localStorage to update them
  let mockBookings = JSON.parse(localStorage.getItem('mock-bookings') || '[]');
  const updatedBooking = mockBookings.find((booking: Booking) => booking.id === id);
  
  if (updatedBooking) {
    updatedBooking.status = status;
    localStorage.setItem('mock-bookings', JSON.stringify(mockBookings));
    
    // If status is assigned, update the provider_id field (in a real app)
    if (status === BookingStatus.Assigned) {
      // This would come from the payload in a real app
      updatedBooking.provider_id = "mock-provider-1";
    }
    
    // Trigger a mock notification (in a real app, this would be a server event)
    const mockNotification = {
      id: `notification-${Date.now()}`,
      title: `Booking ${status}`,
      message: `Booking #${id.substring(0, 8)} has been ${status.toLowerCase()}`,
      createdAt: new Date().toISOString(),
      read: false,
      type: 'booking'
    };
    
    // Add notification through our central mock data service
    addMockNotification(mockNotification);
    
    return updatedBooking;
  }
  
  // For demo purposes, we're just returning a mock response
  return {
    id,
    status,
    service_type: "Updated Service",
    date: new Date().toISOString(),
    total_price: 100,
    address: "123 Main St",
    created_at: new Date().toISOString(),
  };
};

// This would normally interact with an API
const deleteBookingApi = async (id: string): Promise<void> => {
  console.log(`Deleting booking ${id}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove from localStorage mock data
  let mockBookings = JSON.parse(localStorage.getItem('mock-bookings') || '[]');
  mockBookings = mockBookings.filter((booking: Booking) => booking.id !== id);
  localStorage.setItem('mock-bookings', JSON.stringify(mockBookings));
  
  // In a real app, we'd handle the API response
  return;
};

// This would assign a provider to a booking
const assignProviderApi = async ({
  bookingId,
  providerId,
}: {
  bookingId: string;
  providerId: string;
}): Promise<Booking> => {
  console.log(`Assigning provider ${providerId} to booking ${bookingId}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get existing bookings from localStorage to update them
  let mockBookings = JSON.parse(localStorage.getItem('mock-bookings') || '[]');
  const updatedBooking = mockBookings.find((booking: Booking) => booking.id === bookingId);
  
  if (updatedBooking) {
    // Update provider_id and status to assigned
    updatedBooking.provider_id = providerId;
    updatedBooking.status = BookingStatus.Assigned;
    localStorage.setItem('mock-bookings', JSON.stringify(mockBookings));
    
    // Trigger a mock notification
    const mockNotification = {
      id: `notification-${Date.now()}`,
      title: `Provider Assigned`,
      message: `Provider has been assigned to booking #${bookingId.substring(0, 8)}`,
      createdAt: new Date().toISOString(),
      read: false,
      type: 'booking'
    };
    
    // Add notification through our central mock data service
    addMockNotification(mockNotification);
    
    return updatedBooking;
  }
  
  // For demo purposes, we're just returning a mock response
  return {
    id: bookingId,
    provider_id: providerId,
    status: BookingStatus.Assigned,
    service_type: "Updated Service",
    date: new Date().toISOString(),
    total_price: 100,
    address: "123 Main St",
    created_at: new Date().toISOString(),
  };
};

export const useBookingsMutations = (filters: BookingsFilterParams) => {
  const queryClient = useQueryClient();
  const queryKey = getBookingsQueryKey(filters);
  
  // Update booking status mutation
  const updateBookingStatus = useMutation({
    mutationFn: updateBookingStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Booking status updated successfully");
    },
    onError: (error: Error) => {
      console.error("Error updating booking status:", error);
      toast.error(`Failed to update booking status: ${error.message}`);
    },
  });
  
  // Delete booking mutation
  const deleteBooking = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Booking deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Error deleting booking:", error);
      toast.error(`Failed to delete booking: ${error.message}`);
    },
  });
  
  // Assign provider mutation
  const assignProvider = useMutation({
    mutationFn: assignProviderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Provider assigned successfully");
    },
    onError: (error: Error) => {
      console.error("Error assigning provider:", error);
      toast.error(`Failed to assign provider: ${error.message}`);
    },
  });
  
  return {
    updateBookingStatus,
    deleteBooking,
    assignProvider,
  };
};
