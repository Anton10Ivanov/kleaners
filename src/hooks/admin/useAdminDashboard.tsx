
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { mockData } from "@/utils/mock";

export interface DashboardStats {
  totalBookings: number;
  bookingsThisMonth: number;
  bookingsLastMonth: number;
  activeClients: number;  
  newClientsThisMonth: number;
  percentChange: number;
}

export const useAdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    bookingsThisMonth: 0,
    bookingsLastMonth: 0,
    activeClients: 0,
    newClientsThisMonth: 0,
    percentChange: 0
  });

  // Sample data for the booking chart from our mock data
  const sampleBookingData = mockData.monthlyBookingData;

  const fetchUserProfile = async () => {
    try {
      console.log("Fetching user profile on dashboard component...");
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log("User found:", user.id);
        
        try {
          // Get user profile data
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            // Use mock data for development
            setUserName("Admin User");
            return;
          }
          
          if (profile?.first_name || profile?.last_name) {
            setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim());
          } else {
            setUserName(user.email);
          }
        } catch (error) {
          console.error("Profile fetch error:", error);
          // Use mock data for development
          setUserName("Admin User");
        }
      } else {
        // Use mock data for development
        setUserName("Admin User");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Use mock data for development
      setUserName("Admin User");
    }
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch real data from Supabase
      try {
        // Get current date info
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Calculate first and last day of current month
        const firstDayCurrentMonth = new Date(currentYear, currentMonth, 1).toISOString();
        const lastDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0).toISOString();
        
        // Calculate first and last day of previous month
        const firstDayLastMonth = new Date(currentYear, currentMonth - 1, 1).toISOString();
        const lastDayLastMonth = new Date(currentYear, currentMonth, 0).toISOString();
        
        // Fetch total bookings
        const { count: totalBookings, error: totalError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });
          
        // Fetch bookings for current month
        const { count: currentMonthBookings, error: currentError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayCurrentMonth)
          .lte('created_at', lastDayCurrentMonth);
          
        // Fetch bookings for previous month
        const { count: previousMonthBookings, error: prevError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayLastMonth)
          .lte('created_at', lastDayLastMonth);
          
        // Fetch active clients (with at least one booking)
        const { count: activeClients, error: clientsError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
          
        // Fetch new clients this month
        const { count: newClients, error: newClientsError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayCurrentMonth)
          .lte('created_at', lastDayCurrentMonth);
          
        if (totalError || currentError || prevError || clientsError || newClientsError) {
          console.error("Error fetching statistics:", { 
            totalError, currentError, prevError, clientsError, newClientsError 
          });
          throw new Error("Supabase data fetch failed");
        }
        
        // Calculate percent change
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
        
        // Use mock data if Supabase fetch fails
        setStats(mockData.dashboardStats);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      // Fall back to mock data
      setStats(mockData.dashboardStats);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      // Invalidate and refetch all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["clients"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["providers"] })
      ]);

      // Re-fetch the statistics
      await fetchStats();
      
      toast({
        title: "Success",
        description: "Dashboard data refreshed successfully",
      });
    } catch (error) {
      console.error("Refresh error:", error);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Failed to refresh dashboard data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Admin Dashboard component mounted");
    fetchUserProfile();
    fetchStats();
  }, []);

  return {
    isLoading,
    userName,
    error,
    stats,
    sampleBookingData,
    handleRefresh
  };
};
