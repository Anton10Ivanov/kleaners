
import { useAdminProfile } from "./useAdminProfile";
import { useAdminStats } from "./useAdminStats";
import { useAdminRefresh } from "./useAdminRefresh";
import { mockData } from "@/utils/mock";
import { useEffect } from "react";

export const useAdminDashboard = () => {
  const { userName } = useAdminProfile();
  const { isLoading, error, stats, fetchStats } = useAdminStats();
  const { handleRefresh } = useAdminRefresh(fetchStats);

  // Sample data for the booking chart from our mock data
  const sampleBookingData = mockData.monthlyBookingData;

  useEffect(() => {
    console.log("Admin Dashboard component mounted");
    fetchStats();
  }, []);

  return {
    isLoading,
    userName,
    error,
    stats,
    sampleBookingData,
    handleRefresh
  };
};
