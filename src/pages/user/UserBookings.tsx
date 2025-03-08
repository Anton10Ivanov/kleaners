import React, { useState, useEffect } from "react";
import { useTitle } from "@/hooks/useTitle";
import { BookingList } from "@/components/user/bookings/BookingList";
import { BookingFilters } from "@/components/user/bookings/BookingFilters";
import { useUserBookings } from "@/hooks/useUserBookings";
import { Button } from "@/components/ui/button";
import { PlusCircle, Package, Calendar, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorBoundary } from "react-error-boundary";
import { supabase } from "@/integrations/supabase/client";

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

  const [bookingSummary, setBookingSummary] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });
  
  useEffect(() => {
    const calculateSummary = () => {
      if (bookings.length === 0) return;
      
      const upcoming = bookings.filter(b => 
        new Date(b.date) > new Date() && 
        ['pending', 'confirmed'].includes(b.status)
      );
      
      const completed = bookings.filter(b => b.status === 'completed');
      const cancelled = bookings.filter(b => b.status === 'cancelled');
      
      setBookingSummary({
        total: bookings.length,
        upcoming: upcoming.length,
        completed: completed.length,
        cancelled: cancelled.length
      });
    };

    calculateSummary();
  }, [bookings]);
  
  const filteredBookings = bookings
    .filter(booking => {
      if (statusFilter !== "all" && booking.status !== statusFilter) {
        return false;
      }
      
      if (searchQuery && !booking.service.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !booking.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .map(booking => ({
      ...booking,
      hours: booking.duration || 2
    }));
  
  const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <Card className="p-8 text-center">
      <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Card>
  );
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Your Bookings</h1>
          <Link to="/">
            <Button className="mt-4 md:mt-0 bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Book New Service
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">{bookingSummary.total}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">{bookingSummary.upcoming}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">{bookingSummary.completed}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cancelled Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">{bookingSummary.cancelled}</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
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
    </ErrorBoundary>
  );
}
