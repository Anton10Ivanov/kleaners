
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Calendar, Users, Clock } from "lucide-react";

interface StatCardsProps {
  isLoading: boolean;
  stats: {
    totalBookings: number;
    bookingsThisMonth: number;
    bookingsLastMonth: number;
    activeClients: number;
    newClientsThisMonth: number;
    percentChange: number;
  };
}

export const StatCards = ({ isLoading, stats }: StatCardsProps) => {
  return (
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
      
      {/* Active Clients */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            ) : (
              stats.activeClients
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            <Users className="h-3 w-3 mr-1" />
            Total registered users
          </p>
        </CardContent>
      </Card>
      
      {/* New Clients */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">New Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            ) : (
              stats.newClientsThisMonth
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            This month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
