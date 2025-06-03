
// Mock data types
export interface MockClient {
  id: string;
  name: string;
  email: string;
}

export interface MockProvider {
  id: string;
  name: string;
  email: string;
}

export interface MockBooking {
  id: string;
  clientId: string;
  providerId: string;
  service: string;
  date: string;
  status: string;
}

export interface MockInvoice {
  id: string;
  bookingId: string;
  amount: number;
  status: string;
}
