
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BookingEmptyStateProps {
  filterType: string;
}

export function BookingEmptyState({ filterType }: BookingEmptyStateProps): JSX.Element {
  const getMessage = () => {
    switch (filterType) {
      case 'upcoming':
        return "You don't have any upcoming bookings scheduled.";
      case 'completed':
        return "You don't have any completed bookings yet.";
      case 'cancelled':
        return "You don't have any cancelled bookings.";
      default:
        return "You don't have any bookings in this category.";
    }
  };

  return (
    <Card className="card-spacing-lg text-center mt-6">
      <h3 className="text-xl font-medium mb-2">No bookings found</h3>
      <p className="text-muted-foreground mb-6">{getMessage()}</p>
      <Link href="/">
        <Button>Book Your First Cleaning</Button>
      </Link>
    </Card>
  );
}
