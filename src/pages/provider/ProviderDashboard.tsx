
import { useEffect, useState } from "react";
import { useTitle } from "@/hooks/useTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, DollarSign, Users } from "lucide-react";
import { QuickAvailabilityToggle } from "@/components/provider/availability/QuickAvailabilityToggle";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string | number; 
  description: string; 
  icon: React.ElementType 
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-full" />
    </CardContent>
  </Card>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div className="p-6 bg-red-50 border border-red-200 rounded-md">
    <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
    <p className="text-red-600 mt-2">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
    >
      Try again
    </button>
  </div>
);

const ProviderDashboard = () => {
  useTitle("Provider Dashboard");
  
  const [stats, setStats] = useState({
    upcomingBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    weeklyEarnings: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<any>(null);
  
  useEffect(() => {
    fetchProviderData();
    fetchStats();
  }, []);
  
  const fetchProviderData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;
      
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      setProvider(data);
    } catch (error) {
      console.error("Error fetching provider data:", error);
    }
  };
  
  const fetchStats = async () => {
    try {
      setLoading(true);
      // In a real app, this would be fetched from the API
      // For now, we'll use mock data
      
      // Artificial delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStats({
        upcomingBookings: 5,
        pendingBookings: 2,
        completedBookings: 12,
        weeklyEarnings: 450,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Overview of your bookings and earnings</p>
        </div>
        
        {provider && (
          <QuickAvailabilityToggle 
            initialAvailability={provider.is_available} 
            providerId={provider.id}
          />
        )}
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Upcoming Bookings"
                value={stats.upcomingBookings}
                description="Scheduled for the next 7 days"
                icon={CalendarDays}
              />
              <StatCard
                title="Pending Requests"
                value={stats.pendingBookings}
                description="Awaiting confirmation"
                icon={Clock}
              />
              <StatCard
                title="Completed Jobs"
                value={stats.completedBookings}
                description="In the last 30 days"
                icon={Users}
              />
              <StatCard
                title="Weekly Earnings"
                value={`$${stats.weeklyEarnings}`}
                description="Past 7 days"
                icon={DollarSign}
              />
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProviderDashboard;
