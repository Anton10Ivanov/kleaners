
import { MockBooking, MockInvoice } from './types';

// Generate mock invoices for completed bookings
export const generateMockInvoices = (bookings: MockBooking[]): MockInvoice[] => {
  // Filter completed bookings
  const completedBookings = bookings.filter(booking => booking.status === 'completed');
  
  return completedBookings.map((booking, index) => {
    const issueDate = new Date(booking.date);
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 30); // Due 30 days after issue
    
    return {
      id: `inv-${index + 1}`,
      bookingId: booking.id,
      invoiceNumber: `INV-${new Date().getFullYear()}-${1000 + index}`,
      amount: booking.totalPrice,
      issueDate: issueDate.toISOString(),
      dueDate: dueDate.toISOString(),
      status: 'paid',
      filePath: `/invoices/${booking.id}.pdf`
    };
  });
};

// Create specific invoice for Deep Cleaning test booking
export const generateSpecificInvoice = (bookingId: string, amount: number): MockInvoice => {
  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + 30);
  
  return {
    id: 'inv-deep-clean-test',
    bookingId,
    invoiceNumber: `INV-${new Date().getFullYear()}-DEEP-TEST`,
    amount,
    issueDate: issueDate.toISOString(),
    dueDate: dueDate.toISOString(),
    status: 'paid',
    filePath: `/invoices/${bookingId}.pdf`
  };
};
