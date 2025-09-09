
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DollarSign } from "lucide-react";
import { useMediaQuery } from '@/hooks/use-media-query';

// This is demo data; in a real app, this would come from an API
const data = [
  { month: "Jan", earnings: 1500 },
  { month: "Feb", earnings: 2300 },
  { month: "Mar", earnings: 1800 },
  { month: "Apr", earnings: 2400 },
  { month: "May", earnings: 2100 },
  { month: "Jun", earnings: 1900 },
  { month: "Jul", earnings: 3100 },
];

export function EarningsHistory() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-xl flex items-center">
          <DollarSign className="mr-2 h-4 w-4 text-primary" />
          Earnings History
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Your earnings over the last 7 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={isMobile ? "h-[200px]" : "h-[300px]"}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: isMobile ? 0 : 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickMargin={isMobile ? 5 : 10}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`} 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                width={isMobile ? 40 : 60}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Earnings"]}
                contentStyle={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
