
import { format, subDays, subMonths } from 'date-fns';

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

// Generate random mock customers
export const generateMockCustomers = (count: number = 10): MockCustomer[] => {
  const firstNames = ['John', 'Jane', 'Robert', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'James', 'Sophia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Taylor'];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const createdDate = subDays(new Date(), Math.floor(Math.random() * 365));
    
    return {
      id: `cust-${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
      address: `${Math.floor(Math.random() * 1000)} Main St, City, State`,
      createdAt: createdDate.toISOString(),
      totalBookings: Math.floor(Math.random() * 5)
    };
  });
};

// Generate random mock providers
export const generateMockProviders = (count: number = 5): MockProvider[] => {
  const firstNames = ['Lisa', 'Mark', 'Anna', 'Tom', 'Maria', 'Alex', 'Jessica', 'Chris', 'Laura', 'Kevin'];
  const lastNames = ['Wilson', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Moore', 'Allen'];
  const specialtiesList = [
    'Regular Cleaning', 
    'Deep Cleaning', 
    'Move-In/Out Cleaning', 
    'Post-Construction Cleaning',
    'Office Cleaning',
    'Carpet Cleaning'
  ];
  const availabilities = ['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Afternoons'];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const specialtiesCount = Math.floor(Math.random() * 3) + 1;
    const availabilityCount = Math.floor(Math.random() * 3) + 1;
    
    // Randomly select specialties without duplication
    const specialties = [...specialtiesList]
      .sort(() => 0.5 - Math.random())
      .slice(0, specialtiesCount);
      
    // Randomly select availabilities without duplication
    const availability = [...availabilities]
      .sort(() => 0.5 - Math.random())
      .slice(0, availabilityCount);
    
    return {
      id: `prov-${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
      rating: (Math.floor(Math.random() * 10) + 40) / 10, // Rating between 4.0 and 5.0
      specialties,
      availability,
      active: Math.random() > 0.2 // 80% chance of being active
    };
  });
};

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

// Generate mock data for the entire application
export const generateMockAppData = () => {
  const customers = generateMockCustomers(15);
  const providers = generateMockProviders(8);
  const bookings = generateMockBookings(customers, providers, 40);
  const dashboardStats = generateDashboardStats(bookings);
  const monthlyBookingData = generateMonthlyBookingData(bookings);
  
  return {
    customers,
    providers,
    bookings,
    dashboardStats,
    monthlyBookingData
  };
};

// Default mock data export
export const mockData = generateMockAppData();
