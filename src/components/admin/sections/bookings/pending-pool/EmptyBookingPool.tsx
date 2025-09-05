
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

interface EmptyBookingPoolProps {
  isProviderView?: boolean;
}

export const EmptyBookingPool: React.FC<EmptyBookingPoolProps> = ({ isProviderView = false }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isProviderView ? 'No Available Jobs' : 'No Pending Bookings'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="mx-auto bg-muted/50 rounded-full p-6 mb-4">
            <LayoutDashboard className="h-10 w-10 text-muted-foreground" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {isProviderView 
              ? 'Check Back Later' 
              : 'Booking Pool is Empty'
            }
          </h3>
          
          <p className="text-muted-foreground max-w-md">
            {isProviderView
              ? 'New booking requests will appear here when they become available'
              : 'All bookings have been assigned to providers'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
