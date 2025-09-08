
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Booking } from '../types';
import { ProviderJobCard } from './ProviderJobCard';

interface ProviderBookingsListProps {
  bookings: Booking[];
  onAcceptJob: (id: string) => void;
  onRejectJob: (id: string) => void;
  onRefresh: () => void;
}

export const ProviderBookingsList: React.FC<ProviderBookingsListProps> = ({
  bookings,
  onAcceptJob,
  onRejectJob,
  onRefresh
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="form-spacing-relaxed">
          {bookings.map((booking) => (
            <ProviderJobCard 
              key={booking.id} 
              booking={booking}
              onAccept={onAcceptJob}
              onReject={onRejectJob}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={onRefresh}
            className="text-sm"
          >
            Refresh List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
