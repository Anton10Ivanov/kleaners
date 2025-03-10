
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { dev } from '@/lib/utils';
import { mockData } from '@/utils/mock';

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
  
  // Invoice handlers
  http.get('/api/invoices/check/:bookingId', ({ params }) => {
    const { bookingId } = params;
    const invoice = mockData.invoices.find(inv => inv.bookingId === bookingId);
    
    return HttpResponse.json({ 
      exists: !!invoice,
      invoice: invoice || null
    });
  }),
  
  http.get('/api/invoices/download/:bookingId', async ({ params }) => {
    const { bookingId } = params;
    const invoice = mockData.invoices.find(inv => inv.bookingId === bookingId);
    
    if (!invoice) {
      return new HttpResponse(null, { status: 404 });
    }
    
    // Create a simple PDF-like blob
    const invoiceContent = `
      Invoice #${invoice.invoiceNumber}
      -------------------------
      Booking ID: ${invoice.bookingId}
      Amount: $${invoice.amount.toFixed(2)}
      Issue Date: ${new Date(invoice.issueDate).toLocaleDateString()}
      Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
      Status: ${invoice.status}
      
      Thank you for your business!
    `;
    
    // Simulate a PDF file with text content
    const blob = new Blob([invoiceContent], { type: 'application/pdf' });
    
    // Create a fake download response
    return new HttpResponse(blob, { 
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoice.invoiceNumber}.pdf"`
      }
    });
  }),
  
  // Add more handlers as needed
];

// Create the worker instance
let worker: ReturnType<typeof setupWorker> | null = null;

// Conditionally start the worker
export const startMockServiceWorker = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Only setup the worker if it hasn't been set up yet
    if (!worker) {
      worker = setupWorker(...handlers);
    }
    
    if (dev) {
      await worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      });
      console.log('Mock Service Worker started');
    }
  } catch (error) {
    console.warn('Could not start MSW worker:', error);
  }
};
