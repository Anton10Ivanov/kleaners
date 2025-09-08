
import { MockInvoice, MockBooking } from './types';
import { format, addDays } from 'date-fns';

// Generate mock invoices based on bookings
export const generateMockInvoices = (bookings: MockBooking[], count: number = 10): MockInvoice[] => {
  const completedBookings = bookings.filter(b => b.status === 'completed');
  
  return Array.from({ length: Math.min(count, completedBookings.length) }, (_, i) => {
    const booking = completedBookings[i];
    const issueDate = new Date(booking.date);
    const dueDate = addDays(issueDate, 30);
    
    return {
      id: `inv-${i + 1}`,
      bookingId: booking.id,
      invoiceNumber: `INV-2024-${String(i + 1).padStart(3, '0')}`,
      amount: booking.totalPrice,
      issueDate: format(issueDate, 'yyyy-MM-dd'),
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      status: booking.paymentStatus === 'paid' ? 'paid' : 'pending',
      filePath: `/invoices/INV-2024-${String(i + 1).padStart(3, '0')}.pdf`
    };
  });
};
