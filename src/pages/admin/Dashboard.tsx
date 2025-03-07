
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useAdminDashboard } from '@/hooks/admin/useAdminDashboard';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatCards from '@/components/admin/dashboard/StatCards';
import BookingTrends from '@/components/admin/dashboard/BookingTrends';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from 'react-error-boundary';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  useTitle("Admin Dashboard");

  // Error fallback component
  const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <Card className="p-8 text-center">
      <h3 className="text-xl font-medium mb-2">Dashboard Error</h3>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={resetErrorBoundary}>
        <RefreshCw className="mr-2 h-4 w-4" /> Reload Dashboard
      </Button>
    </Card>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <div className="space-y-4 p-4 md:p-8">
        <DashboardHeader />
        <StatCards />
        <BookingTrends />
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
