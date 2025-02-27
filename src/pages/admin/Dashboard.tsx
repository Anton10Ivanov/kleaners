
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const queryClient = useQueryClient();

  const handleSync = async () => {
    try {
      // Invalidate and refetch all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["customers"] }),
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["providers"] })
      ]);

      toast({
        title: "Success",
        description: "Dashboard data synchronized successfully",
      });
    } catch (error) {
      console.error("Sync error:", error);
      toast({
        variant: "destructive",
        title: "Sync failed",
        description: "Failed to synchronize dashboard data",
      });
    }
  };

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <Card className="shadow-lg dark:glass-morphism">
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSync}
                className="hover:text-primary hover:border-primary transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl md:text-2xl">Admin Dashboard</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-6">
          <div className="rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm">
            <AdminTabs />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

