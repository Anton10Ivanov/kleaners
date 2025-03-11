
import { addDays, format, subDays, subMonths } from 'date-fns';
import { DashboardStats } from '@/hooks/admin/useAdminDashboard';

// Generate mock dashboard statistics
export const generateDashboardStats = (bookings: any[]): DashboardStats => {
  const lastMonth = subMonths(new Date(), 1);
  const lastMonthBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.createdAt || booking.created_at);
    return bookingDate.getMonth() === lastMonth.getMonth() && 
           bookingDate.getFullYear() === lastMonth.getFullYear();
  }).length;
  
  const currentMonth = new Date();
  const currentMonthBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.createdAt || booking.created_at);
    return bookingDate.getMonth() === currentMonth.getMonth() && 
           bookingDate.getFullYear() === currentMonth.getFullYear();
  }).length;
  
  // Calculate percent change
  const percentChange = lastMonthBookings > 0 
    ? ((currentMonthBookings - lastMonthBookings) / lastMonthBookings) * 100
    : 0;
  
  return {
    totalBookings: bookings.length,
    bookingsThisMonth: currentMonthBookings,
    bookingsLastMonth: lastMonthBookings,
    activeClients: 32,
    newClientsThisMonth: 8,
    percentChange
  };
};

// Generate sample data for the monthly booking chart
export const generateMonthlyBookingData = (bookings: any[]) => {
  // Ensure we have at least 7 days of data
  const result = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'MMM dd');
    
    // Count bookings for this day
    const count = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt || booking.created_at);
      return bookingDate.getDate() === date.getDate() && 
             bookingDate.getMonth() === date.getMonth() && 
             bookingDate.getFullYear() === date.getFullYear();
    }).length;
    
    return {
      date: dateStr,
      bookings: count > 0 ? count : Math.floor(Math.random() * 6) + 1 // Random number (1-6) if no real data
    };
  });
  
  return result;
};
