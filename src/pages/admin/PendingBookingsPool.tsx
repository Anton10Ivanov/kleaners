
import React, { useState, useEffect } from 'react';
import { PendingBookingsPool } from '@/components/admin/sections/bookings/PendingBookingsPool';
import { Booking } from '@/components/admin/sections/bookings/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';

export const AdminPendingBookingsPool = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Function to fetch pending bookings from mock data
  const fetchPendingBookings = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Create 3 mock pending bookings for the pool
      const mockPendingBookings: Booking[] = [
        {
          id: 'pool-1',
          first_name: 'John',
          last_name: 'Davis',
          email: 'john.davis@example.com',
          phone: '+1234567890',
          date: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
          service_type: 'regular',
          address: '123 Main St, Apt 4B, New York',
          total_price: 120,
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          status: 'pending',
          time_slot: '10:00 - 12:00', // Changed from 'time' to 'time_slot'
        },
        {
          id: 'pool-2',
          first_name: 'Emily',
          last_name: 'Wilson',
          email: 'emily.wilson@example.com',
          phone: '+1987654321',
          date: new Date(Date.now() + 345600000).toISOString(), // 4 days from now
          service_type: 'deep',
          address: '456 Park Ave, Suite 303, Boston',
          total_price: 220,
          created_at: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
          status: 'pending',
          time_slot: '14:00 - 17:00', // Changed from 'time' to 'time_slot'
        },
        {
          id: 'pool-3',
          first_name: 'Michael',
          last_name: 'Brown',
          email: 'michael.brown@example.com',
          phone: '+1122334455',
          date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
          service_type: 'move_in_out',
          address: '789 Oak St, Chicago',
          total_price: 180,
          created_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
          status: 'pending',
          time_slot: '09:00 - 11:00', // Changed from 'time' to 'time_slot'
        }
      ];
      
      setPendingBookings(mockPendingBookings);
      setIsLoading(false);
    }, 1000);
  };
  
  // Fetch bookings on component mount
  useEffect(() => {
    fetchPendingBookings();
  }, []);
  
  const handleRefresh = () => {
    toast.info("Refreshing pending bookings list...");
    fetchPendingBookings();
  };
  
  return (
    <div className="container mx-auto py-2 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6">
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 md:mb-6`}>
          Pending Bookings Pool
        </h1>
        <p className="text-muted-foreground mb-6">
          New bookings from clients waiting for provider assignment. Assign providers to bookings to move them out of the pool.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <PendingBookingsPool 
            pendingBookings={pendingBookings} 
            refreshData={handleRefresh} 
          />
        )}
      </div>
    </div>
  );
};
