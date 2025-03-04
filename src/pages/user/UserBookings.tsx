
import { useState } from "react";
import { useUserBookings } from "@/hooks/useUserBookings";
import BookingList from "@/components/user/bookings/BookingList";
import BookingFilters from "@/components/user/bookings/BookingFilters";
import { BookingCardProps } from "@/components/user/bookings/BookingCard";

/**
 * UserBookings Page
 * 
 * Displays user's bookings with filtering and search capabilities
 * 
 * @returns {JSX.Element} The user bookings page
 */
export default function UserBookings(): JSX.Element {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    bookings, 
    isLoading, 
    error 
  } = useUserBookings();
  
  /**
   * Filters bookings based on current tab and search query
   * @returns {BookingCardProps[]} Filtered bookings
   */
  const getFilteredBookings = (): BookingCardProps[] => {
    return bookings?.filter(booking => {
      const matchesTab = 
        (activeTab === "upcoming" && booking.status === "pending") ||
        (activeTab === "completed" && booking.status === "completed") ||
        (activeTab === "cancelled" && booking.status === "cancelled");
        
      const matchesSearch = 
        !searchQuery || 
        booking.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.service?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTab && matchesSearch;
    }) as BookingCardProps[];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">View and manage all your cleaning service bookings</p>
      </div>

      <BookingFilters
        activeTab={activeTab}
        searchQuery={searchQuery}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
      >
        <BookingList
          bookings={getFilteredBookings()}
          isLoading={isLoading}
          error={error}
          activeTab={activeTab}
          searchQuery={searchQuery}
        />
      </BookingFilters>
    </div>
  );
}
