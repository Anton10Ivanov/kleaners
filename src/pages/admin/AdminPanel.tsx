
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatsSummary from "@/components/admin/AdminStatsSummary";
import AdminQuickActions from "@/components/admin/AdminQuickActions";
import BookingTrends from "@/components/admin/dashboard/BookingTrends";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import ErrorDisplay from "@/components/admin/dashboard/ErrorDisplay";
import { AreaChart, BarChart } from "@/components/ui/chart";

/**
 * AdminPanel Page
 * 
 * Main dashboard for administrators showing key metrics and activity
 * 
 * @returns {JSX.Element} The admin panel page
 */
export default function AdminPanel(): JSX.Element {
  const { bookingsData, customersData, error, isLoading } = useAdminDashboard();

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="space-y-6">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your business metrics and recent activity
            </p>
          </div>

          {error ? (
            <ErrorDisplay message={error.message} />
          ) : (
            <>
              {/* Stats Summary Cards */}
              <AdminStatsSummary />
              
              {/* Quick Actions */}
              <AdminQuickActions />
              
              {/* Booking Trends & Activity */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Booking Trends Chart */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Booking Trends</CardTitle>
                    <CardDescription>
                      Number of bookings over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BookingTrends data={bookingsData} isLoading={isLoading} />
                  </CardContent>
                </Card>
                
                {/* Services Distribution */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Service Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of bookings by service type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { name: "Regular", value: 42 },
                        { name: "Deep Clean", value: 18 },
                        { name: "Move In/Out", value: 12 },
                        { name: "Business", value: 8 },
                      ]}
                      index="name"
                      categories={["value"]}
                      colors={["blue"]}
                      yAxisWidth={40}
                      showAnimation={true}
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Revenue & Customer Insights */}
              <Tabs defaultValue="revenue">
                <TabsList>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="customers">Customer Growth</TabsTrigger>
                </TabsList>
                
                <TabsContent value="revenue" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>
                        Monthly revenue trends and projections
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <AreaChart
                        data={[
                          { date: "Jan", revenue: 8400 },
                          { date: "Feb", revenue: 9200 },
                          { date: "Mar", revenue: 8900 },
                          { date: "Apr", revenue: 11200 },
                          { date: "May", revenue: 10800 },
                          { date: "Jun", revenue: 12450 },
                        ]}
                        index="date"
                        categories={["revenue"]}
                        colors={["green"]}
                        valueFormatter={(value) => `$${value.toLocaleString()}`}
                        showAnimation={true}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="customers" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Growth</CardTitle>
                      <CardDescription>
                        New and returning customer trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <AreaChart
                        data={customersData || []}
                        index="month"
                        categories={["new", "returning"]}
                        colors={["blue", "purple"]}
                        valueFormatter={(value) => value.toString()}
                        showAnimation={true}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
