
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw } from "lucide-react";

interface BookingTrendsProps {
  isLoading: boolean;
  data: Array<{
    date: string;
    bookings: number;
  }>;
}

export const BookingTrends = ({ isLoading, data }: BookingTrendsProps) => {
  return (
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
            <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">Chart will be implemented here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
