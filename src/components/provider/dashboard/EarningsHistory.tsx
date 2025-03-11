
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { AreaChart, Area } from "recharts";
import { ArrowUpIcon, ArrowDownIcon, DollarSign } from "lucide-react";
import { EarningsPeriod, useProviderEarnings } from "@/hooks/useProviderEarnings";
import { Skeleton } from "@/components/ui/skeleton";

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md">
        <p className="text-gray-500">{label}</p>
        <p className="text-primary font-semibold">${payload[0].value?.toFixed(2)}</p>
      </div>
    );
  }

  return null;
};

export function EarningsHistory() {
  const [period, setPeriod] = useState<EarningsPeriod>("monthly");
  const { earningsData, isLoading } = useProviderEarnings(period);

  const handlePeriodChange = (value: string) => {
    setPeriod(value as EarningsPeriod);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-primary" />
          Earnings History
        </CardTitle>
        <CardDescription>
          Track your earnings over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" onValueChange={handlePeriodChange}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                ${earningsData?.totalEarnings.toFixed(2)}
              </div>
              <div className={`ml-2 flex items-center text-sm ${
                earningsData?.percentChange && earningsData.percentChange >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {earningsData?.percentChange && earningsData.percentChange >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {Math.abs(earningsData?.percentChange || 0).toFixed(1)}%
              </div>
            </div>
          </div>
          
          <TabsContent value="weekly" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData?.chartData || []}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData?.chartData || []}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-0">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData?.chartData || []}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
