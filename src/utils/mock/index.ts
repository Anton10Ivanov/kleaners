
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

// Generate function
export const generateMockAppData = () => mockData;

// Re-export types
export * from './types';
export * from './clients';
export * from './customers';
export * from './providers';
export * from './bookings';
export * from './invoices';
