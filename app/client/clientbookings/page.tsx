'use client'


import React, { useState, useEffect } from "react";
import { useTitle } from '@/hooks/useTitle';
import { BookingList } from '@/components/user/bookings/BookingList';
import { useUserBookings } from '@/hooks/useUserBookings';
import { ErrorBoundary } from "react-error-boundary";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterableStatsCards } from '@/components/user/bookings/FilterableStatsCards';
import { BookingEmptyState } from '@/components/user/bookings/BookingEmptyState';
import { BookingActionButton } from '@/components/user/bookings/BookingActionButton';
import { useSearchParams } from "next/navigation";
import { BookingStatus } from '@/types/enums';

/**
 * ClientBookings Page
 * 
 * Displays a client's booking history with filtering options via stats cards
 * 
 * @returns {JSX.Element} Client bookings page component
 */
export default function ClientBookings(): JSX.Element {
  useTitle("Your Bookings | Kleaners");
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const [filterType, setFilterType] = useState<string>(filterParam || "upcoming");
  
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

  // Apply URL filter parameters when component mounts or URL changes
  useEffect(() => {
    if (filterParam && ['upcoming', 'completed', 'cancelled'].includes(filterParam)) {
      setFilterType(filterParam);
    }
  }, [filterParam]);
  
  useEffect(() => {
    const calculateSummary = () => {
      if (bookings.length === 0) return;
      
      // Count bookings by status
      const upcoming = bookings.filter(b => b.status === BookingStatus.Pending);
      const completed = bookings.filter(b => b.status === BookingStatus.Completed);
      const cancelled = bookings.filter(b => b.status === BookingStatus.Cancelled);
      
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
      if (filterType === "upcoming") {
        return booking.status === BookingStatus.Pending;
      } else if (filterType === "completed") {
        return booking.status === BookingStatus.Completed;
      } else if (filterType === "cancelled") {
        return booking.status === BookingStatus.Cancelled;
      }
      return false;
    })
    .map(booking => ({
      ...booking,
      hours: booking.duration || 2
    }));
  
  const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <Card className="card-spacing-lg text-center">
      <h3 className="text-xl font-medium mb-2">Something went wrong</h3>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Card>
  );
  
  // Determine whether to show bookings or empty state
  const showEmptyState = !isLoading && filteredBookings.length === 0;
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <div className="container mx-auto px-4 section-spacing-sm">
        <FilterableStatsCards
          filterType={filterType}
          setFilterType={setFilterType}
          bookingSummary={bookingSummary}
        />
        
        <div className="pt-6">
          <BookingActionButton />
          
          {showEmptyState ? (
            <BookingEmptyState filterType={filterType} />
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
      </div>
    </ErrorBoundary>
  );
}
