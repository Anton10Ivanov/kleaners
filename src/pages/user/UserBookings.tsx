
import React, { useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { BookingList } from "@/components/user/bookings/BookingList";
import { BookingFilters } from "@/components/user/bookings/BookingFilters";
import { useUserBookings } from "@/hooks/useUserBookings";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Your Bookings</h1>
        <Link to="/">
          <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Book New Service
          </Button>
        </Link>
      </div>
      
      <BookingFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {filteredBookings.length === 0 && !isLoading ? (
        <Card className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-6">You don't have any bookings matching your criteria.</p>
          <Link to="/">
            <Button>Book Your First Cleaning</Button>
          </Link>
        </Card>
      ) : (
        <BookingList 
          bookings={filteredBookings}
          isLoading={isLoading}
          error={error}
          onCancel={cancelBooking}
          onReschedule={rescheduleBooking}
        />
      )}
    </div>
  );
}
