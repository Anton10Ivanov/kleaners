
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BookingEmptyStateProps {
  filterType: string;
}

export function BookingEmptyState({ filterType }: BookingEmptyStateProps): JSX.Element {
  return (
    <Card className="p-8 text-center">
      <h3 className="text-xl font-medium mb-2">No bookings found</h3>
      <p className="text-muted-foreground mb-6">You don't have any {filterType} bookings.</p>
      <Link to="/">
        <Button>Book Your First Cleaning</Button>
      </Link>
    </Card>
  );
}
