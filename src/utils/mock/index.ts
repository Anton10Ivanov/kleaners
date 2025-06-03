
// Import all mock generators
import { generateMockClients } from './clients';
import { generateMockCustomers } from './customers';
import { generateMockProviders } from './providers';
import { generateMockBookings } from './bookings';
import { generateMockInvoices } from './invoices';

// Simple mock data structure
const mockClients = [];
const mockCustomers = [];
const mockProviders = [];
const mockBookings = [];
const mockInvoices = [];
const mockDashboard = {
  totalBookings: 0,
  totalRevenue: 0,
  activeProviders: 0,
  completionRate: 0
};
const mockEarnings = [];

// Mock data object
export const mockData = {
  clients: mockClients,
  customers: mockCustomers,
  providers: mockProviders,
  bookings: mockBookings,
  invoices: mockInvoices,
  dashboard: mockDashboard,
  earnings: mockEarnings
};

// Generate function - properly export this function
export function generateMockAppData() {
  const clients = generateMockClients(10);
  const customers = generateMockCustomers(10);
  const providers = generateMockProviders(5);
  const bookings = generateMockBookings(clients, providers, 20);
  const invoices = generateMockInvoices(bookings, 10);
  
  return {
    clients,
    customers,
    providers,
    bookings,
    invoices,
    dashboard: {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
      activeProviders: providers.filter(p => p.active).length,
      completionRate: bookings.filter(b => b.status === 'completed').length / bookings.length * 100
    },
    earnings: []
  };
}

// Re-export types
export * from './types';
export * from './clients';
export * from './customers';
export * from './providers';
export * from './bookings';
export * from './invoices';
