
import React, { useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { BookingList } from "@/components/user/bookings/BookingList";
import { BookingFilters } from "@/components/user/bookings/BookingFilters";
import { useUserBookings } from "@/hooks/useUserBookings";

/**
 * UserBookings Page
 * 
 * Displays a user's booking history with filtering options
 * 
 * @returns {JSX.Element} User bookings page component
 */
export default function UserBookings(): JSX.Element {
  useTitle("Your Bookings | Kleaners");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const { 
    bookings, 
    isLoading, 
    error, 
    cancelBooking,
    rescheduleBooking
  } = useUserBookings();
  
  // Process bookings based on filters
  const filteredBookings = bookings
    .filter(booking => {
      // Filter by status
      if (statusFilter !== "all" && booking.status !== statusFilter) {
        return false;
      }
      
      // Filter by search
      if (searchQuery && !booking.service.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !booking.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .map(booking => ({
      ...booking,
      // Add the hours property needed by BookingCard
      hours: booking.duration || 2 // Fallback to a default value if duration is missing
    }));
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
      
      <BookingFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <BookingList 
        bookings={filteredBookings}
        isLoading={isLoading}
        error={error}
        onCancel={cancelBooking}
        onReschedule={rescheduleBooking}
      />
    </div>
  );
}
