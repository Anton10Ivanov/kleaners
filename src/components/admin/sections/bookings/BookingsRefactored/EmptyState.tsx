
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarX2 } from 'lucide-react';

export interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-gray-800 rounded-lg border">
      <CalendarX2 className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No bookings found</h3>
      
      {hasFilters ? (
        <div className="mt-4 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            There are no bookings matching your current filters.
          </p>
          <Button onClick={onClearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      ) : (
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
          There are no bookings in the system yet. New bookings will appear here.
        </p>
      )}
    </div>
  );
};
