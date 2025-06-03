
// This file is maintained for backward compatibility
// It re-exports everything from the new modular structure
import { mockData, generateMockAppData } from './mock';

export * from './mock/types';
export * from './mock/customers';
export * from './mock/providers';
export * from './mock/bookings';
export * from './mock/invoices';
export { generateMockAppData };
export { mockData };

export default mockData;
