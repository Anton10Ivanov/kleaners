
import { format, subDays } from 'date-fns';
import { MockClient } from './types';

// Generate random mock customers (legacy name kept for file path consistency)
export const generateMockCustomers = (count: number = 10): MockClient[] => {
  const firstNames = ['John', 'Jane', 'Robert', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'James', 'Sophia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Taylor'];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const createdDate = subDays(new Date(), Math.floor(Math.random() * 365));
    
    return {
      id: `cust-${i + 1}`,
      name: `${firstName} ${lastName}`,
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
