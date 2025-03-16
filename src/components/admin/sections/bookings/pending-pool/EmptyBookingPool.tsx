
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface EmptyBookingPoolProps {
  isProviderView?: boolean;
}

export const EmptyBookingPool: React.FC<EmptyBookingPoolProps> = ({ isProviderView = false }) => {
  return (
    <Card className="bg-theme-lightblue border-gray-200">
      <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2 text-theme-darkheading">No pending bookings</h3>
        <p className="text-muted-foreground max-w-md">
          There are currently no bookings waiting for {isProviderView ? 'acceptance' : 'provider assignment'}. 
          New bookings from clients will appear here.
        </p>
      </CardContent>
    </Card>
  );
};
