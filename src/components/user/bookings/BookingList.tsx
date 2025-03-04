
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import BookingCard, { BookingCardProps } from "./BookingCard";

/**
 * BookingListProps interface
 */
interface BookingListProps {
  /**
   * Array of bookings to display
   */
  bookings: BookingCardProps[];
  
  /**
   * Whether bookings are currently loading
   */
  isLoading: boolean;
  
  /**
   * Error message if loading bookings failed
   */
  error: Error | null;
  
  /**
   * Current filter status
   */
  activeTab: string;
  
  /**
   * Current search query
   */
  searchQuery: string;
}

/**
 * BookingList Component
 * 
 * Displays a list of booking cards with loading states and empty states
 * 
 * @param {BookingListProps} props - Component props
 * @returns {JSX.Element} A list of booking cards
 */
export const BookingList = ({
  bookings,
  isLoading,
  error,
  activeTab,
  searchQuery,
}: BookingListProps): JSX.Element => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4" aria-live="polite" aria-busy="true">
        {[1, 2, 3].map((i) => (
          <div key={i} aria-hidden="true">
            <BookingCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10" role="alert" aria-live="assertive">
        <p className="text-red-500">Failed to load bookings. Please try again.</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10" aria-live="polite">
        <h3 className="text-lg font-semibold">
          No {activeTab} bookings found
        </h3>
        <p className="text-muted-foreground mt-1">
          {searchQuery
            ? "Try adjusting your search criteria"
            : activeTab === "upcoming"
            ? "You don't have any upcoming bookings"
            : activeTab === "completed"
            ? "You don't have any completed bookings yet"
            : "You don't have any cancelled bookings"}
        </p>
        {activeTab === "upcoming" && (
          <Button
            className="mt-4 bg-primary hover:bg-primary/90"
            onClick={() => navigate("/")}
          >
            Book a Cleaning
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4" aria-live="polite">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          {...booking}
        />
      ))}
    </div>
  );
};

/**
 * BookingCardSkeleton Component
 * 
 * Displays a skeleton loader for booking cards when data is loading
 * 
 * @returns {JSX.Element} A skeleton loader for a booking card
 */
const BookingCardSkeleton = (): JSX.Element => (
  <div className="overflow-hidden border rounded-lg" aria-hidden="true">
    <div className="p-4 pb-2">
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <div className="p-4 space-y-3">
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
    <div className="p-4 border-t">
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  </div>
);

export default BookingList;
