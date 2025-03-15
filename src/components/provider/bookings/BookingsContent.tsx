
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BookingList from './BookingList';
import BookingDetailsCard from './BookingDetailsCard';
import { BookingMap } from './BookingMap';
import FilterableStatsCards from './FilterableStatsCards';
import { toast } from 'sonner';

interface BookingsContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  upcomingBookings: any[];
  pendingBookings: any[];
  completedBookings: any[];
  selectedBookingId?: string;
  setSelectedBookingId: (id?: string) => void;
  selectedBooking: any | null;
  bookingSummary: {
    total: number;
    upcoming: number;
    pending: number;
    completed: number;
  };
}

const BookingsContent: React.FC<BookingsContentProps> = ({
  selectedTab,
  setSelectedTab,
  upcomingBookings,
  pendingBookings,
  completedBookings,
  selectedBookingId,
  setSelectedBookingId,
  selectedBooking,
  bookingSummary
}) => {
  const handleAcceptJob = (bookingId: string) => {
    // In a real app, you would call an API to accept the job
    console.log(`Accepting job: ${bookingId}`);
    toast.success("Job accepted successfully. Client details are now available.");
    
    // Remove from pending and add to upcoming
    // This would be handled by a global state update or API call in a real app
  };
  
  const handleRejectJob = (bookingId: string) => {
    // In a real app, you would call an API to reject the job
    console.log(`Rejecting job: ${bookingId}`);
    toast.success("Job rejected");
    
    // Remove from pending list
    // This would be handled by a global state update or API call in a real app
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left column - Booking lists */}
      <div className="lg:col-span-1 space-y-4">
        <FilterableStatsCards 
          bookingSummary={bookingSummary}
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Assignments</CardTitle>
            <CardDescription>
              {selectedTab === 'upcoming' && 'Upcoming cleaning jobs'}
              {selectedTab === 'pending' && 'Jobs awaiting your confirmation'}
              {selectedTab === 'completed' && 'Past completed jobs'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="upcoming">
                  Upcoming ({bookingSummary.upcoming})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({bookingSummary.pending})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({bookingSummary.completed})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-0">
                <BookingList 
                  bookings={upcomingBookings} 
                  type="upcoming"
                  onSelectBooking={setSelectedBookingId}
                  selectedBookingId={selectedBookingId}
                />
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                <BookingList 
                  bookings={pendingBookings} 
                  type="pending"
                  onSelectBooking={setSelectedBookingId}
                  selectedBookingId={selectedBookingId}
                  onAcceptJob={handleAcceptJob}
                  onRejectJob={handleRejectJob}
                />
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <BookingList 
                  bookings={completedBookings} 
                  type="completed"
                  onSelectBooking={setSelectedBookingId}
                  selectedBookingId={selectedBookingId}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Right column - Booking details */}
      <div className="lg:col-span-2 space-y-4">
        {selectedBooking ? (
          <>
            <BookingDetailsCard booking={selectedBooking} />
            <BookingMap booking={selectedBooking} />
          </>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center min-h-[300px] text-center">
              <div>
                <h3 className="text-lg font-medium mb-2">No booking selected</h3>
                <p className="text-muted-foreground">
                  Select a booking from the list to view details
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsContent;
