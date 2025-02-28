
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
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
  );
};
