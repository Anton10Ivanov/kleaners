
import React from 'react';

interface BookingsStatusBadgeProps {
  status: string;
  count: number;
}

export const BookingsStatusBadge: React.FC<BookingsStatusBadgeProps> = ({
  status,
  count
}) => {
  return (
    <div className="text-sm font-medium">
      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">
        {count} {status} {count === 1 ? "booking" : "bookings"}
      </span>
    </div>
  );
};
