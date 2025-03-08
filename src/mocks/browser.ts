
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { dev } from '@/lib/utils';

// Define handlers
export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]);
  }),
  
  http.get('/api/bookings', () => {
    return HttpResponse.json([
      { 
        id: 'b1', 
        service: 'Regular Cleaning',
        date: '2023-06-15',
        status: 'completed'
      },
      { 
        id: 'b2', 
        service: 'Deep Cleaning',
        date: '2023-06-20',
        status: 'scheduled'
      },
    ]);
  }),
  
  // Add more handlers as needed
];

// Create the worker instance
const worker = typeof window !== 'undefined' ? setupWorker(...handlers) : null;

// Conditionally start the worker
export const startMockServiceWorker = async () => {
  if (dev && worker) {
    await worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    });
    console.log('Mock Service Worker started');
  }
};
