
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";
import { generateMockEarningsData } from "@/utils/mock/earnings";

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

interface UseProviderEarningsReturn {
  earningsData: EarningsSummary | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch provider earnings data
 * @param period The time period for earnings data (weekly, monthly, yearly)
 * @returns Object containing earnings data, loading state, and error state
 */
export function useProviderEarnings(period: EarningsPeriod = "monthly"): UseProviderEarningsReturn {
  const [earningsData, setEarningsData] = useState<EarningsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEarningsData = async () => {
      setIsLoading(true);
      
      try {
        await validateUserAuthentication();
        const mockData = generateMockEarningsData(period);
        setEarningsData(mockData);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarningsData();
  }, [period, toast]);

  // Validate that user is authenticated
  const validateUserAuthentication = async () => {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }
  };

  // Handle errors in the data fetching process
  const handleError = (err: unknown) => {
    console.error("Error fetching earnings data:", err);
    const errorInstance = err instanceof Error ? err : new Error("Failed to fetch earnings data");
    setError(errorInstance);
    
    toast({
      variant: "destructive",
      title: "Error fetching earnings data",
      description: "Please try again later",
    });
  };

  return { earningsData, isLoading, error };
}
