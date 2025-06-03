
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

// Re-export types (create empty types file to prevent errors)
export interface MockClient {}
export interface MockProvider {}
export interface MockBooking {}
export interface MockInvoice {}
