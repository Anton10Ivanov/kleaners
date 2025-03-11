
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export type EarningsPeriod = "weekly" | "monthly" | "yearly";

export interface EarningsData {
  date: string;
  amount: number;
}

export interface EarningsSummary {
  totalEarnings: number;
  currentPeriodEarnings: number;
  previousPeriodEarnings: number;
  percentChange: number;
  chartData: EarningsData[];
}

export function useProviderEarnings(period: EarningsPeriod = "monthly") {
  const [earningsData, setEarningsData] = useState<EarningsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEarningsData = async () => {
      setIsLoading(true);
      try {
        // In a production app, this would fetch from Supabase
        // For now, we'll generate mock data
        
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user) {
          throw new Error("User not authenticated");
        }

        // Generate mock data based on the selected period
        const mockData = generateMockEarningsData(period);
        setEarningsData(mockData);
      } catch (err) {
        console.error("Error fetching earnings data:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch earnings data"));
        toast({
          variant: "destructive",
          title: "Error fetching earnings data",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarningsData();
  }, [period, toast]);

  return { earningsData, isLoading, error };
}

// Helper function to generate mock earnings data
function generateMockEarningsData(period: EarningsPeriod): EarningsSummary {
  const currentDate = new Date();
  let chartData: EarningsData[] = [];
  
  // Generate appropriate chart data based on selected period
  if (period === "weekly") {
    // Last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      chartData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: Math.floor(Math.random() * 150) + 50
      });
    }
  } else if (period === "monthly") {
    // Last 30 days grouped by week
    for (let i = 4; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (i * 7));
      chartData.push({
        date: `Week ${4-i + 1}`,
        amount: Math.floor(Math.random() * 600) + 200
      });
    }
  } else if (period === "yearly") {
    // Last 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = currentDate.getMonth();
    
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      chartData.push({
        date: months[monthIndex],
        amount: Math.floor(Math.random() * 2500) + 1000
      });
    }
  }
  
  // Calculate summary statistics
  const totalEarnings = chartData.reduce((sum, item) => sum + item.amount, 0);
  const halfwayPoint = Math.floor(chartData.length / 2);
  const currentPeriodEarnings = chartData.slice(halfwayPoint).reduce((sum, item) => sum + item.amount, 0);
  const previousPeriodEarnings = chartData.slice(0, halfwayPoint).reduce((sum, item) => sum + item.amount, 0);
  const percentChange = previousPeriodEarnings > 0 
    ? ((currentPeriodEarnings - previousPeriodEarnings) / previousPeriodEarnings) * 100 
    : 0;

  return {
    totalEarnings,
    currentPeriodEarnings,
    previousPeriodEarnings,
    percentChange,
    chartData
  };
}
