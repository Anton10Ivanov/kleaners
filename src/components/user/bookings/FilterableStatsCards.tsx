
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Calendar, Clock, AlertCircle } from 'lucide-react';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card 
        className={`cursor-pointer transition-all ${filterType === 'all' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('all')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
              <h3 className="text-2xl font-bold mt-1">{bookingSummary.total}</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all ${filterType === 'upcoming' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('upcoming')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
              <h3 className="text-2xl font-bold mt-1">{bookingSummary.upcoming}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all ${filterType === 'completed' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('completed')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed Bookings</p>
              <h3 className="text-2xl font-bold mt-1">{bookingSummary.completed}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className={`cursor-pointer transition-all ${filterType === 'cancelled' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => setFilterType('cancelled')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cancelled Bookings</p>
              <h3 className="text-2xl font-bold mt-1">{bookingSummary.cancelled}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
