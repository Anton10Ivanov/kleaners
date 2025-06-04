
// This file is maintained for backward compatibility
// It re-exports everything from the new modular structure
export * from './mock/types';
export * from './mock/customers';
export * from './mock/providers';
export * from './mock/bookings';
export * from './mock/invoices';

// Import and re-export the mock data and generator function
import { mockData } from './mock';
import { generateMockAppData } from './mock';

export { generateMockAppData };
export { mockData };
export default mockData;
