'use client'


import { useState, useEffect } from 'react';

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeProviders: number;
  completionRate: number;
}

interface AdminStatsData {
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
  dashboardStats: DashboardStats;
}

export const useAdminStats = () => {
  const [data, setData] = useState<AdminStatsData>({
    invoices: [],
    bookings: [],
    dashboardStats: {
      totalBookings: 0,
      totalRevenue: 0,
      activeProviders: 0,
      completionRate: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshStats = () => {
    setLoading(true);
    // Mock refresh
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        dashboardStats: {
          totalBookings: Math.floor(Math.random() * 100),
          totalRevenue: Math.floor(Math.random() * 10000),
          activeProviders: Math.floor(Math.random() * 20),
          completionRate: Math.floor(Math.random() * 100)
        }
      }));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return { 
    data, 
    loading, 
    error,
    totalBookings: data.dashboardStats?.totalBookings || 0,
    totalRevenue: data.dashboardStats?.totalRevenue || 0,
    refreshStats 
  };
};
