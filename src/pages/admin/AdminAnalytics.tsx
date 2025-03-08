
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useAdminDashboard } from '@/hooks/admin/useAdminDashboard';
import { DashboardHeader } from '@/components/admin/dashboard/DashboardHeader';
import { StatCards } from '@/components/admin/dashboard/StatCards';
import { BookingTrends } from '@/components/admin/dashboard/BookingTrends';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from 'react-error-boundary';
import { RefreshCw, UserCheck, UserX } from 'lucide-react';

const AdminAnalytics = () => {
  useTitle("Admin Analytics");
  const { isLoading, userName, stats, sampleBookingData, handleRefresh } = useAdminDashboard();

  // Sample provider applications data
  const recentApplications = [
    { id: '1', name: 'John Doe', email: 'john@example.com', date: '2023-09-10', hasCriminalRecord: false },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', date: '2023-09-09', hasCriminalRecord: true },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', date: '2023-09-08', hasCriminalRecord: false },
  ];

  // Error fallback component
  const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <Card className="p-8 text-center">
      <h3 className="text-xl font-medium mb-2">Analytics Error</h3>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={resetErrorBoundary}>
        <RefreshCw className="mr-2 h-4 w-4" /> Reload Analytics
      </Button>
    </Card>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <div className="space-y-4 p-4 md:p-8">
        <DashboardHeader 
          userName={userName}
          isLoading={isLoading}
          onRefresh={handleRefresh}
          isMobile={window.innerWidth < 768}
        />
        <StatCards 
          isLoading={isLoading}
          stats={stats}
        />
        <BookingTrends 
          isLoading={isLoading}
          data={sampleBookingData}
        />
        
        {/* Provider applications section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Provider Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Email</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Background Check</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application) => (
                    <tr key={application.id} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4">{application.name}</td>
                      <td className="py-3 px-4">{application.email}</td>
                      <td className="py-3 px-4">{application.date}</td>
                      <td className="py-3 px-4">
                        {application.hasCriminalRecord ? (
                          <div className="flex items-center text-red-500">
                            <UserX className="h-4 w-4 mr-1" /> Has record
                          </div>
                        ) : (
                          <div className="flex items-center text-green-500">
                            <UserCheck className="h-4 w-4 mr-1" /> No record
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default AdminAnalytics;
