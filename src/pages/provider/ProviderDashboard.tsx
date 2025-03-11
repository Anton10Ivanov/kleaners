
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EarningsHistory } from "@/components/provider/dashboard/EarningsHistory";
import { ServicePerformance } from "@/components/provider/dashboard/ServicePerformance";
import { Calendar, Briefcase, Clock, TrendingUp } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const ProviderDashboard = () => {
  useEffect(() => {
    document.title = "Provider Dashboard";
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="space-y-4 md:space-y-6 pb-16 md:pb-0">
      <div className="mb-2 md:mb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Overview of your bookings, earnings, and performance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="shadow-sm border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <TrendingUp className={`h-4 w-4 text-primary ${isMobile ? 'hidden' : ''}`} />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">$6,395</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-amber-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <Briefcase className={`h-4 w-4 text-amber-400 ${isMobile ? 'hidden' : ''}`} />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">
              +4% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-green-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className={`h-4 w-4 text-green-400 ${isMobile ? 'hidden' : ''}`} />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Next: Today, 10:00 AM
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-purple-400">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:pb-2">
            <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
            <Clock className={`h-4 w-4 text-purple-400 ${isMobile ? 'hidden' : ''}`} />
          </CardHeader>
          <CardContent className="p-3 pt-0 md:pt-0">
            <div className="text-xl md:text-2xl font-bold">214</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <EarningsHistory />
        </div>
        <div className="lg:col-span-3">
          <ServicePerformance />
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
