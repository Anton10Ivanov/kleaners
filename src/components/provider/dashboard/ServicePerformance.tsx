
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, TooltipProps } from "recharts";
import { Activity } from "lucide-react";

interface ServiceData {
  name: string;
  jobs: number;
  earnings: number;
}

const data: ServiceData[] = [
  { name: "Regular Cleaning", jobs: 24, earnings: 1250 },
  { name: "Deep Cleaning", jobs: 18, earnings: 1620 },
  { name: "Move In/Out", jobs: 12, earnings: 960 },
  { name: "Post Construction", jobs: 8, earnings: 1440 },
  { name: "Office Cleaning", jobs: 15, earnings: 1125 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md">
        <p className="text-gray-500">{label}</p>
        <p className="font-semibold">{payload[0].name}: {payload[0].value} jobs</p>
        <p className="font-semibold text-primary">
          ${payload[1].value?.toFixed(2)} earnings
        </p>
      </div>
    );
  }

  return null;
};

export function ServicePerformance() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          Service Performance
        </CardTitle>
        <CardDescription>
          Compare earnings by service type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#82ca9d"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="jobs" fill="#8884d8" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
              <Bar yAxisId="right" dataKey="earnings" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
