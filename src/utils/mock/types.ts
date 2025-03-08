
// Common types for mock data

// Customer mock data
export interface MockCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  totalBookings: number;
}

// Provider mock data
export interface MockProvider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating: number;
  specialties: string[];
  availability: string[];
  active: boolean;
}

// Booking mock data
export interface MockBooking {
  id: string;
  customerId: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  providerId?: string;
  providerName?: string;
  address: string;
  totalPrice: number;
}

// Invoice mock data
export interface MockInvoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  filePath: string;
}
