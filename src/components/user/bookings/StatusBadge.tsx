
import React, { memo, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BookingStatus } from '@/types/enums';

interface StatusBadgeProps {
  status: BookingStatus;
}

export const StatusBadge = memo(function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  // Memoize status color calculation
  const statusColor = useMemo(() => {
    switch (status) {
      case BookingStatus.Completed:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case BookingStatus.Cancelled:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case BookingStatus.Assigned:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case BookingStatus.Confirmed:
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case BookingStatus.Pending:
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  }, [status]);
  
  // Memoize status text calculation
  const statusText = useMemo(() => {
    if (status === BookingStatus.Pending) {
      return 'Upcoming';
    }
    // Capitalize first letter of status
    return status.charAt(0).toUpperCase() + status.slice(1);
  }, [status]);
  
  return (
    <Badge className={cn("ml-2", statusColor)}>
      {statusText}
    </Badge>
  );
});
