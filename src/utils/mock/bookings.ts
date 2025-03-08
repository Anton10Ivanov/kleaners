
import { format, subDays } from 'date-fns';
import { MockBooking, MockCustomer, MockProvider } from './types';

// Generate random mock bookings based on customers and providers
export const generateMockBookings = (
  customers: MockCustomer[], 
  providers: MockProvider[], 
  count: number = 20
): MockBooking[] => {
  const services = [
    'Regular Cleaning', 
    'Deep Cleaning', 
    'Move-In/Out Cleaning', 
    'Post-Construction Cleaning',
    'Office Cleaning'
  ];
  const statuses = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
  const paymentStatuses = ['pending', 'paid', 'refunded'] as const;
  
  return Array.from({ length: count }, (_, i) => {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const provider = Math.random() > 0.2 ? providers[Math.floor(Math.random() * providers.length)] : undefined;
    const service = services[Math.floor(Math.random() * services.length)];
    const duration = Math.floor(Math.random() * 3) + 2; // 2-4 hours
    const bookingDate = subDays(new Date(), Math.floor(Math.random() * 30));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Set payment status based on booking status
    let paymentStatus: typeof paymentStatuses[number];
    if (status === 'completed') {
      paymentStatus = Math.random() > 0.95 ? 'refunded' : 'paid';
    } else if (status === 'cancelled') {
      paymentStatus = Math.random() > 0.5 ? 'refunded' : 'pending';
    } else {
      paymentStatus = Math.random() > 0.3 ? 'paid' : 'pending';
    }
    
    return {
      id: `book-${i + 1}`,
      customerId: customer.id,
      customerName: `${customer.firstName} ${customer.lastName}`,
      service,
      date: format(bookingDate, 'yyyy-MM-dd'),
      time: `${Math.floor(Math.random() * 9) + 8}:00`, // Between 8:00 and 17:00
      duration,
      status,
      paymentStatus,
      providerId: provider?.id,
      providerName: provider ? `${provider.firstName} ${provider.lastName}` : undefined,
      address: customer.address,
      totalPrice: Math.floor((duration * 50 + Math.random() * 50) * 100) / 100 // Random price based on duration
    };
  });
};

// Generate specific completed Deep Cleaning booking for invoice testing
export const generateSpecificDeepCleaningBooking = (customer: MockCustomer, provider: MockProvider): MockBooking => {
  return {
    id: 'book-deep-clean-test',
    customerId: customer.id,
    customerName: `${customer.firstName} ${customer.lastName}`,
    service: 'Deep Cleaning',
    date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    time: '10:00',
    duration: 4,
    status: 'completed',
    paymentStatus: 'paid',
    providerId: provider.id,
    providerName: `${provider.firstName} ${provider.lastName}`,
    address: customer.address,
    totalPrice: 250.00
  };
};
