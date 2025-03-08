
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'completed' | 'cancelled';
}

export function StatusBadge({ status }: StatusBadgeProps): JSX.Element {
  // Get status badge color
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  // Get display status text
  const getStatusText = () => {
    if (status === 'pending') {
      return 'Upcoming';
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  return (
    <Badge className={cn("ml-2", getStatusColor())}>
      {getStatusText()}
    </Badge>
  );
}
