
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useBookings } from '@/hooks/useBookings";

export const Dashboard = () => {
  // Use the same hook that powers the bookings table
  const { 
    bookings, 
    isLoading,
  } = useBookings({
    selectedStatus: null,
    searchTerm: "",
    sortField: "created_at",
    sortOrder: "desc",
    dateRange: undefined,
  });

  // Calculate summary statistics
  const stats = useMemo(() => {
    if (!bookings) return { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      revenue: bookings
        .filter(b => b.status !== 'cancelled')
        .reduce((sum, booking) => sum + (booking.total_price || 0), 0)
    };
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center card-spacing-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="form-spacing-loose">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{stats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{stats.confirmed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cancelled Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{stats.cancelled}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">€{stats.revenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
