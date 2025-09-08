
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const useAdminRefresh = (fetchStats: () => Promise<void>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    try {
      // Invalidate and refetch all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["clients"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["providers"] })
      ]);

      // Re-fetch the statistics
      await fetchStats();
      
      toast({
        title: "Success",
        description: "Dashboard data refreshed successfully",
      });
    } catch (error) {
      console.error("Refresh error:", error);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Failed to refresh dashboard data",
      });
    }
  };

  return { handleRefresh };
};
