
import { Card, CardContent } from "@/components/ui/card";
import AdminTabs from "@/components/admin/AdminTabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { StatCards } from "@/components/admin/dashboard/StatCards";
import { BookingTrends } from "@/components/admin/dashboard/BookingTrends";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";
import { ErrorDisplay } from "@/components/admin/dashboard/ErrorDisplay";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

const AdminDashboard = () => {
  const { 
    isLoading, 
    userName, 
    error, 
    stats, 
    sampleBookingData, 
    handleRefresh 
  } = useAdminDashboard();
  
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="container mx-auto py-2 px-2 md:py-8 md:px-4">
      <Card className="shadow-lg dark:glass-morphism border-0 dark:border dark:border-gray-800">
        <DashboardHeader 
          userName={userName} 
          isLoading={isLoading} 
          onRefresh={handleRefresh} 
          isMobile={isMobile} 
        />
        
        <CardContent className="p-3 md:p-6">
          {/* Stats Cards */}
          <StatCards isLoading={isLoading} stats={stats} />
          
          {/* Bookings Chart */}
          <BookingTrends isLoading={isLoading} data={sampleBookingData} />
          
          {/* Quick Access Tabs */}
          <Card>
            <CardContent className="p-0">
              <AdminTabs activeTab="bookings" onTabChange={() => {}} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
