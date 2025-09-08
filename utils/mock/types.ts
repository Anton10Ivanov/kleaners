
// Mock data types
export interface MockClient {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  totalBookings: number;
}

export interface MockProvider {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating: number;
  specialties: string[];
  availability: string[];
  active: boolean;
}

export interface MockBooking {
  id: string;
  clientId: string;
  clientName: string;
  providerId?: string;
  providerName?: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  address: string;
  totalPrice: number;
}

export interface MockInvoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: string;
  filePath: string;
}
