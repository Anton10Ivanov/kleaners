
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { mockData } from "@/utils/mock";
import { DashboardStats } from "@/hooks/admin/types";

export const useAdminStats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    bookingsThisMonth: 0,
    bookingsLastMonth: 0,
    activeClients: 0,
    newClientsThisMonth: 0,
    percentChange: 0
  });

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      try {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const firstDayCurrentMonth = new Date(currentYear, currentMonth, 1).toISOString();
        const lastDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0).toISOString();
        const firstDayLastMonth = new Date(currentYear, currentMonth - 1, 1).toISOString();
        const lastDayLastMonth = new Date(currentYear, currentMonth, 0).toISOString();
        
        const { count: totalBookings, error: totalError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });
          
        const { count: currentMonthBookings, error: currentError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayCurrentMonth)
          .lte('created_at', lastDayCurrentMonth);
          
        const { count: previousMonthBookings, error: prevError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayLastMonth)
          .lte('created_at', lastDayLastMonth);
          
        const { count: activeClients, error: clientsError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
          
        const { count: newClients, error: newClientsError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayCurrentMonth)
          .lte('created_at', lastDayCurrentMonth);
          
        if (totalError || currentError || prevError || clientsError || newClientsError) {
          throw new Error("Supabase data fetch failed");
        }
        
        const percentChange = previousMonthBookings > 0 
          ? ((currentMonthBookings - previousMonthBookings) / previousMonthBookings) * 100
          : 0;
        
        setStats({
          totalBookings: totalBookings || 0,
          bookingsThisMonth: currentMonthBookings || 0,
          bookingsLastMonth: previousMonthBookings || 0,
          activeClients: activeClients || 0,
          newClientsThisMonth: newClients || 0,
          percentChange
        });
      } catch (error) {
        console.log("Using mock data instead of Supabase data");
        setStats(mockData.dashboardStats);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStats(mockData.dashboardStats);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    stats,
    fetchStats
  };
};
