
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { BookingStatus } from '@/types/enums';

interface FilterableStatsCardsProps {
  filterType: string;
  setFilterType: (type: string) => void;
  bookingSummary: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
}

export function FilterableStatsCards({
  filterType,
  setFilterType,
  bookingSummary
}: FilterableStatsCardsProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card 
        className={`cursor-pointer transition-all ${filterType === 'upcoming' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('upcoming')}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-2xl font-bold">{bookingSummary.upcoming}</p>
            <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
            <div className="bg-blue-100 p-3 rounded-full mt-3 dark:bg-blue-950/30">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all ${filterType === 'completed' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('completed')}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-2xl font-bold">{bookingSummary.completed}</p>
            <p className="text-sm font-medium text-muted-foreground">Completed Bookings</p>
            <div className="bg-green-100 p-3 rounded-full mt-3 dark:bg-green-950/30">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all ${filterType === 'cancelled' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('cancelled')}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-2xl font-bold">{bookingSummary.cancelled}</p>
            <p className="text-sm font-medium text-muted-foreground">Cancelled Bookings</p>
            <div className="bg-red-100 p-3 rounded-full mt-3 dark:bg-red-950/30">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
