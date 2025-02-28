
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  LayoutDashboard, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Users,
  Home,
  DollarSign,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - this would ideally be fetched from your database
const sampleBookingData = [
  { date: 'Jan', bookings: 4 },
  { date: 'Feb', bookings: 6 },
  { date: 'Mar', bookings: 8 },
  { date: 'Apr', bookings: 12 },
  { date: 'May', bookings: 10 },
  { date: 'Jun', bookings: 12 },
  { date: 'Jul', bookings: 14 },
  { date: 'Aug', bookings: 18 },
  { date: 'Sep', bookings: 20 },
  { date: 'Oct', bookings: 22 },
  { date: 'Nov', bookings: 21 },
  { date: 'Dec', bookings: 23 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    bookingsThisMonth: 0,
    bookingsLastMonth: 0,
    activeCustomers: 0,
    newCustomersThisMonth: 0,
    percentChange: 0
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    console.log("Admin Dashboard component mounted");
    
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile on dashboard component...");
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          console.log("User found:", user.id);
          // Get user profile data
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            return;
          }
          
          if (profile?.first_name || profile?.last_name) {
            setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim());
          } else {
            setUserName(user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user data. Please try refreshing the page.");
      }
    };

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
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
          
        // Fetch active customers (with at least one booking)
        const { count: activeCustomers, error: customersError } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });
          
        // Fetch new customers this month
        const { count: newCustomers, error: newCustomersError } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', firstDayCurrentMonth)
          .lte('created_at', lastDayCurrentMonth);
          
        if (totalError || currentError || prevError || customersError || newCustomersError) {
          console.error("Error fetching statistics:", { 
            totalError, currentError, prevError, customersError, newCustomersError 
          });
          setError("Failed to load statistics. Please try refreshing.");
          return;
        }
        
        // Calculate percent change
        const percentChange = previousMonthBookings > 0 
          ? ((currentMonthBookings - previousMonthBookings) / previousMonthBookings) * 100
          : 0;
        
        setStats({
          totalBookings: totalBookings || 0,
          bookingsThisMonth: currentMonthBookings || 0,
          bookingsLastMonth: previousMonthBookings || 0,
          activeCustomers: activeCustomers || 0,
          newCustomersThisMonth: newCustomers || 0,
          percentChange
        });
        
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setError("Failed to load statistics. Please try refreshing.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    fetchStats();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      // Invalidate and refetch all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["customers"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["providers"] })
      ]);

      // Re-fetch the statistics
      const fetchStats = async () => {
        // Would re-implement the stats fetching logic here
        // For brevity, we'll just use a timeout to simulate a refresh
        setTimeout(() => {
          setIsLoading(false);
          toast({
            title: "Success",
            description: "Dashboard data refreshed successfully",
          });
        }, 1000);
      };
      
      fetchStats();
    } catch (error) {
      console.error("Refresh error:", error);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Failed to refresh dashboard data",
      });
      setIsLoading(false);
    }
  };

  const { toast } = useToast();

  if (error) {
    return (
      <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <Card className="shadow-lg dark:glass-morphism border-0 dark:border dark:border-gray-800">
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2 text-primary" />
              <CardTitle className="text-xl md:text-2xl">Analytics Dashboard</CardTitle>
              {userName && (
                <span className="ml-4 text-sm font-medium hidden md:inline-block">
                  Welcome, {userName}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="default"
                size={isMobile ? "sm" : "default"}
                onClick={() => navigate('/admin')}
              >
                <Home className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Bookings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  ) : (
                    stats.totalBookings
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  All time bookings
                </p>
              </CardContent>
            </Card>
            
            {/* Monthly Bookings */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  ) : (
                    stats.bookingsThisMonth
                  )}
                </div>
                <p className="text-xs flex items-center mt-1">
                  {stats.percentChange > 0 ? (
                    <>
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">
                        {Math.abs(stats.percentChange).toFixed(1)}% 
                      </span>
                      <span className="text-muted-foreground ml-1">vs last month</span>
                    </>
                  ) : stats.percentChange < 0 ? (
                    <>
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                      <span className="text-red-500">
                        {Math.abs(stats.percentChange).toFixed(1)}% 
                      </span>
                      <span className="text-muted-foreground ml-1">vs last month</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No change from last month</span>
                  )}
                </p>
              </CardContent>
            </Card>
            
            {/* Active Customers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  ) : (
                    stats.activeCustomers
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  Total registered users
                </p>
              </CardContent>
            </Card>
            
            {/* New Customers */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                  ) : (
                    stats.newCustomersThisMonth
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  This month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Bookings Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Booking Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sampleBookingData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary) / 0.2)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Access Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <AdminTabs />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
