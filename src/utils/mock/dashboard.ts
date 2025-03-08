
import { format, subMonths } from 'date-fns';
import { MockBooking } from './types';

// Generate dashboard stats based on bookings
export const generateDashboardStats = (bookings: MockBooking[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Filter bookings for current and previous month
  const bookingsThisMonth = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
  });
  
  const bookingsLastMonth = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return bookingDate.getMonth() === lastMonth && bookingDate.getFullYear() === lastMonthYear;
  });
  
  // Calculate unique customers for each month
  const customerIdsThisMonth = new Set(bookingsThisMonth.map(b => b.customerId));
  const customerIdsLastMonth = new Set(bookingsLastMonth.map(b => b.customerId));
  const newCustomersThisMonth = [...customerIdsThisMonth].filter(id => !customerIdsLastMonth.has(id)).length;
  
  // Calculate percent change
  const percentChange = bookingsLastMonth.length > 0 
    ? ((bookingsThisMonth.length - bookingsLastMonth.length) / bookingsLastMonth.length) * 100
    : 0;
  
  return {
    totalBookings: bookings.length,
    bookingsThisMonth: bookingsThisMonth.length,
    bookingsLastMonth: bookingsLastMonth.length,
    activeCustomers: new Set(bookings.map(b => b.customerId)).size,
    newCustomersThisMonth,
    percentChange
  };
};

// Generate monthly booking data for charts
export const generateMonthlyBookingData = (bookings: MockBooking[]) => {
  // Create a map for all months
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const bookingsByMonth = new Map(months.map(month => [month, 0]));
  
  // Count bookings by month
  bookings.forEach(booking => {
    const date = new Date(booking.date);
    const month = months[date.getMonth()];
    bookingsByMonth.set(month, (bookingsByMonth.get(month) || 0) + 1);
  });
  
  // Convert to array format for charts
  return months.map(month => ({
    date: month,
    bookings: bookingsByMonth.get(month) || 0
  }));
};
