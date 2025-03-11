
import { generateMockCustomers } from './customers';
import { generateMockProviders } from './providers'; 
import { generateMockBookings, generateSpecificDeepCleaningBooking } from './bookings';
import { generateMockInvoices, generateSpecificInvoice } from './invoices';
import { generateDashboardStats, generateMonthlyBookingData } from './dashboard';

// Generate mock data for the entire application
export const generateMockAppData = () => {
  const clients = generateMockCustomers(15);
  const providers = generateMockProviders(8);
  
  // Generate regular bookings
  const bookings = generateMockBookings(clients, providers, 40);
  
  // Add a specific Deep Cleaning booking for testing invoices
  const specificClient = clients[0];
  const specificProvider = providers[0];
  const deepCleaningBooking = generateSpecificDeepCleaningBooking(specificClient, specificProvider);
  
  // Add the specific booking to our bookings array
  const allBookings = [...bookings, deepCleaningBooking];
  
  // Generate invoices including the special test invoice
  const regularInvoices = generateMockInvoices(bookings);
  const specificInvoice = generateSpecificInvoice(deepCleaningBooking.id, deepCleaningBooking.totalPrice);
  const invoices = [...regularInvoices, specificInvoice];
  
  const dashboardStats = generateDashboardStats(allBookings);
  const monthlyBookingData = generateMonthlyBookingData(allBookings);
  
  return {
    clients,
    providers,
    bookings: allBookings,
    invoices,
    dashboardStats,
    monthlyBookingData
  };
};

// Default mock data export
export const mockData = generateMockAppData();

// Re-export types for convenience
export * from './types';
