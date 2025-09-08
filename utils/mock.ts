
// Mock data utilities for development
export const mockData = {
  invoices: [
    {
      id: "inv-001",
      bookingId: "b1",
      invoiceNumber: "INV-2024-001",
      amount: 120,
      issueDate: "2024-01-15",
      dueDate: "2024-01-30",
      status: "paid"
    },
    {
      id: "inv-002", 
      bookingId: "b2",
      invoiceNumber: "INV-2024-002",
      amount: 210,
      issueDate: "2024-01-20",
      dueDate: "2024-02-05",
      status: "pending"
    }
  ],
  
  bookings: [
    {
      id: "b1",
      service: "Regular Cleaning",
      date: "2024-01-15",
      status: "completed",
      hours: 3,
      price: 120
    },
    {
      id: "b2", 
      service: "Deep Cleaning",
      date: "2024-01-20",
      status: "scheduled",
      hours: 5,
      price: 210
    }
  ]
};

export const generateMockInvoicePDF = (invoiceData: any): Blob => {
  const content = `
    Invoice #${invoiceData.invoiceNumber}
    -------------------------
    Booking ID: ${invoiceData.bookingId}
    Amount: $${invoiceData.amount.toFixed(2)}
    Issue Date: ${new Date(invoiceData.issueDate).toLocaleDateString()}
    Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()}
    Status: ${invoiceData.status}
    
    Thank you for your business!
  `;
  
  return new Blob([content], { type: 'application/pdf' });
};
