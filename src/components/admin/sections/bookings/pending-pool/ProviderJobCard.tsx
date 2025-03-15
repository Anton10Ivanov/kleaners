
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Booking } from '../types';

interface ProviderJobCardProps {
  booking: Booking;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const ProviderJobCard: React.FC<ProviderJobCardProps> = ({
  booking,
  onAccept,
  onReject
}) => {
  return (
    <Card key={booking.id} className="overflow-hidden shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{booking.service_type?.replace('_', ' ')}</h3>
          <p className="text-sm text-right">${booking.total_price?.toFixed(2)}</p>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm">{new Date(booking.date || '').toLocaleDateString()}</p>
          <p className="text-sm text-muted-foreground truncate">{booking.address}</p>
        </div>
        
        <div className="flex justify-between gap-2 mt-4">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onAccept(booking.id)}
          >
            <Check className="h-4 w-4 mr-2" />
            Accept Job
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onReject(booking.id)}
          >
            <X className="h-4 w-4 mr-2" />
            Reject Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
