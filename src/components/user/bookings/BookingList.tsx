
import React from 'react';
import { BookingCard } from './BookingCard';
import { UserBooking } from '@/hooks/useUserBookings';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

export interface BookingListProps {
  /** List of bookings to display */
  bookings: (UserBooking & { hours: number })[];
  
  /** Whether the bookings are currently loading */
  isLoading: boolean;
  
  /** Error object if the fetch failed */
  error: Error | null;
  
  /** Function to handle booking cancellation */
  onCancel: (bookingId: string) => Promise<boolean>;
  
  /** Function to handle booking rescheduling */
  onReschedule: (bookingId: string, newDate: string) => Promise<boolean>;
}

/**
 * BookingList Component
 * 
 * Displays a list of bookings with loading and error states.
 * 
 * @param {BookingListProps} props - Component props
 * @returns {JSX.Element} Booking list component
 */
export function BookingList({
  bookings,
  isLoading,
  error,
  onCancel,
  onReschedule
}: BookingListProps): JSX.Element {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/4 mb-1" />
            <Skeleton className="h-5 w-2/4 mb-1" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
        <h3 className="text-lg font-semibold">Error Loading Bookings</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{error.message}</p>
      </div>
    );
  }
  
  // Empty state
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No bookings found</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          You don't have any bookings matching your filters.
        </p>
      </div>
    );
  }
  
  // Render booking list
  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <BookingCard 
          key={booking.id}
          booking={booking}
          onCancel={() => onCancel(booking.id)}
          onReschedule={(newDate) => onReschedule(booking.id, newDate)}
        />
      ))}
    </div>
  );
}
