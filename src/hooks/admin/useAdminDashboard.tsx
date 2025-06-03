
import { useState, useEffect } from 'react';

interface DashboardData {
  invoices: Array<{
    id: string;
    bookingId: string;
    invoiceNumber: string;
    amount: number;
    issueDate: string;
    dueDate: string;
    status: string;
  }>;
  bookings: Array<{
    id: string;
    service: string;
    date: string;
    status: string;
    hours: number;
    price: number;
  }>;
  monthlyBookingData: Array<{
    month: string;
    bookings: number;
    revenue: number;
  }>;
}

export const useAdminDashboard = () => {
  const [data, setData] = useState<DashboardData>({
    invoices: [],
    bookings: [],
    monthlyBookingData: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock data for now
    setData({
      invoices: [],
      bookings: [],
      monthlyBookingData: [
        { month: 'Jan', bookings: 25, revenue: 2500 },
        { month: 'Feb', bookings: 30, revenue: 3000 },
        { month: 'Mar', bookings: 35, revenue: 3500 }
      ]
    });
  }, []);

  return { data, loading, error };
};
