
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Briefcase, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatus } from "@/components/admin/sections/bookings/types";

interface DashboardStat {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [bookingStats, setBookingStats] = useState<{ [key in BookingStatus]?: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch total bookings
        const { data: bookings, error: bookingsError } = await supabase
          .from("bookings")
          .select("status")
          .order("created_at", { ascending: false });

        if (bookingsError) throw bookingsError;

        // Fetch providers count
        const { count: providersCount, error: providersError } = await supabase
          .from("service_providers")
          .select("*", { count: "exact", head: true });

        if (providersError) throw providersError;

        // Fetch customers count
        const { count: customersCount, error: customersError } = await supabase
          .from("customers")
          .select("*", { count: "exact", head: true });

        if (customersError) throw customersError;

        // Calculate booking statistics
        const statusCounts: { [key in BookingStatus]?: number } = {};
        if (bookings) {
          bookings.forEach((booking) => {
            const status = booking.status as BookingStatus;
            statusCounts[status] = (statusCounts[status] || 0) + 1;
          });
        }
        setBookingStats(statusCounts);

        // Create stats for dashboard
        const dashboardStats: DashboardStat[] = [
          {
            title: "Total Bookings",
            value: bookings?.length || 0,
            icon: <Calendar className="h-5 w-5 text-blue-600" />,
            description: "All-time bookings",
          },
          {
            title: "Service Providers",
            value: providersCount || 0,
            icon: <Briefcase className="h-5 w-5 text-indigo-600" />,
            description: "Active cleaning professionals",
          },
          {
            title: "Customers",
            value: customersCount || A,
            icon: <Users className="h-5 w-5 text-green-600" />,
            description: "Registered clients",
          },
          {
            title: "Completion Rate",
            value: calculateCompletionRate(statusCounts) + "%",
            icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
            description: "Successfully completed jobs",
          },
        ];

        setStats(dashboardStats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const calculateCompletionRate = (statusCounts: { [key in BookingStatus]?: number }) => {
    const completed = statusCounts.completed || 0;
    const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "assigned":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-indigo-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Booking Status</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {Object.entries(bookingStats).map(([status, count]) => (
                <Card key={status}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium capitalize">
                      {status}
                    </CardTitle>
                    {getStatusIcon(status as BookingStatus)}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Activity feed will be implemented in the next iteration.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
