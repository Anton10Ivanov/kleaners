
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatsSummary from "@/components/admin/AdminStatsSummary";
import AdminQuickActions from "@/components/admin/AdminQuickActions";
import { BookingTrends } from "@/components/admin/dashboard/BookingTrends";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { ErrorDisplay } from "@/components/admin/dashboard/ErrorDisplay";

/**
 * AdminPanel Page
 * 
 * Main dashboard for administrators showing key metrics and activity
 * 
 * @returns {JSX.Element} The admin panel page
 */
export default function AdminPanel(): JSX.Element {
  const { isLoading, error, stats, sampleBookingData } = useAdminDashboard();

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
            <ErrorDisplay error={error} />
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
                    <BookingTrends data={sampleBookingData} isLoading={isLoading} />
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
                    <div className="h-64">
                      <div className="grid grid-cols-4 gap-4 h-full">
                        {/* Simple chart substitute */}
                        <div className="bg-blue-100 dark:bg-blue-800/30 rounded-md relative h-full">
                          <div className="absolute bottom-0 w-full bg-blue-500 h-[42%] rounded-md"></div>
                          <div className="absolute bottom-0 w-full p-2 text-center text-xs">Regular</div>
                        </div>
                        <div className="bg-green-100 dark:bg-green-800/30 rounded-md relative h-full">
                          <div className="absolute bottom-0 w-full bg-green-500 h-[18%] rounded-md"></div>
                          <div className="absolute bottom-0 w-full p-2 text-center text-xs">Deep Clean</div>
                        </div>
                        <div className="bg-amber-100 dark:bg-amber-800/30 rounded-md relative h-full">
                          <div className="absolute bottom-0 w-full bg-amber-500 h-[12%] rounded-md"></div>
                          <div className="absolute bottom-0 w-full p-2 text-center text-xs">Move In/Out</div>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-800/30 rounded-md relative h-full">
                          <div className="absolute bottom-0 w-full bg-purple-500 h-[8%] rounded-md"></div>
                          <div className="absolute bottom-0 w-full p-2 text-center text-xs">Business</div>
                        </div>
                      </div>
                    </div>
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
                      {/* Placeholder for revenue chart */}
                      <div className="h-full flex flex-col space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                        <div className="relative flex-1 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-green-500/20 to-green-500/5 rounded-md">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500"></div>
                          </div>
                          <div className="absolute bottom-0 left-[0%] w-[16.7%] h-[40%] bg-green-500 rounded-t-sm"></div>
                          <div className="absolute bottom-0 left-[16.7%] w-[16.7%] h-[48%] bg-green-500 rounded-t-sm"></div>
                          <div className="absolute bottom-0 left-[33.4%] w-[16.7%] h-[44%] bg-green-500 rounded-t-sm"></div>
                          <div className="absolute bottom-0 left-[50.1%] w-[16.7%] h-[58%] bg-green-500 rounded-t-sm"></div>
                          <div className="absolute bottom-0 left-[66.8%] w-[16.7%] h-[52%] bg-green-500 rounded-t-sm"></div>
                          <div className="absolute bottom-0 left-[83.5%] w-[16.7%] h-[62%] bg-green-500 rounded-t-sm"></div>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span>$8,400</span>
                          <span>$9,200</span>
                          <span>$8,900</span>
                          <span>$11,200</span>
                          <span>$10,800</span>
                          <span>$12,450</span>
                        </div>
                      </div>
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
                      {/* Placeholder for customer growth chart */}
                      <div className="h-full flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">New Customers</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">Returning Customers</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-6 gap-4 flex-1">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                            <div key={month} className="flex flex-col h-full">
                              <div className="flex-1 relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                                <div className="absolute bottom-0 w-full bg-blue-500 h-[30%]"></div>
                                <div className="absolute bottom-[30%] w-full bg-purple-500 h-[20%]"></div>
                              </div>
                              <div className="text-center text-xs mt-1">{month}</div>
                            </div>
                          ))}
                        </div>
                      </div>
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
