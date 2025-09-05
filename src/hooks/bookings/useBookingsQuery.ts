
import { useQuery } from "@tanstack/react-query";
import { Booking } from "@/components/admin/sections/bookings/types";
import { BookingsFilterParams, getBookingsQueryKey } from "./bookingsUtils";
import { getMockBookings } from "@/utils/mock/mockDataService";

// Fetch bookings using our mock data service
const fetchBookings = async (filters: BookingsFilterParams): Promise<Booking[]> => {
  console.log("Fetching bookings with filters:", filters);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get bookings from our mock data service
  let bookings = getMockBookings();
  
  // Apply filters on the client side (this would normally be done on the server)
  // Filter by status if provided
  if (filters.selectedStatus) {
    bookings = bookings.filter(booking => booking.status === filters.selectedStatus);
  }
  
  // Filter by search term if provided
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    bookings = bookings.filter(booking => {
      const nameMatch = `${booking.first_name || ''} ${booking.last_name || ''}`.toLowerCase().includes(searchLower);
      const serviceMatch = booking.service_type?.toLowerCase().includes(searchLower);
      const addressMatch = booking.address?.toLowerCase().includes(searchLower);
      return nameMatch || serviceMatch || addressMatch;
    });
  }
  
  // Filter by date range if provided
  if (filters.dateRange?.from) {
    const fromDate = new Date(filters.dateRange.from);
    bookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= fromDate;
    });
  }
  
  if (filters.dateRange?.to) {
    const toDate = new Date(filters.dateRange.to);
    bookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate <= toDate;
    });
  }
  
  // Sort bookings
  bookings.sort((a, b) => {
    // Handle different sort fields
    switch (filters.sortField) {
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'total_price':
        return a.total_price - b.total_price;
      case 'created_at':
      default:
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
  });
  
  // Apply sort order
  if (filters.sortOrder === 'desc') {
    bookings.reverse();
  }
  
  return bookings;
};

export const useBookingsQuery = (filters: BookingsFilterParams) => {
  return useQuery({
    queryKey: getBookingsQueryKey(filters),
    queryFn: () => fetchBookings(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
};
