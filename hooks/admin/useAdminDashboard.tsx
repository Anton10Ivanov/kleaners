'use client'


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

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeProviders: number;
  completionRate: number;
}

export const useAdminDashboard = () => {
  const [data, setData] = useState<DashboardData>({
    invoices: [],
    bookings: [],
    monthlyBookingData: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock user name
  const userName = "Admin User";
  
  // Mock stats
  const stats: DashboardStats = {
    totalBookings: 150,
    totalRevenue: 15000,
    activeProviders: 25,
    completionRate: 95
  };

  // Sample booking data for charts
  const sampleBookingData = [
    { month: 'Jan', bookings: 25, revenue: 2500 },
    { month: 'Feb', bookings: 30, revenue: 3000 },
    { month: 'Mar', bookings: 35, revenue: 3500 },
    { month: 'Apr', bookings: 40, revenue: 4000 },
    { month: 'May', bookings: 45, revenue: 4500 },
    { month: 'Jun', bookings: 50, revenue: 5000 }
  ];

  const handleRefresh = () => {
    setLoading(true);
    // Mock refresh logic
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Mock data loading
    setData({
      invoices: [],
      bookings: [],
      monthlyBookingData: sampleBookingData
    });
  }, []);

  return { 
    data, 
    loading, 
    error, 
    isLoading: loading,
    userName,
    stats,
    sampleBookingData,
    handleRefresh
  };
};
