
import React from 'react';
import { Button } from '@/components/ui/button';

interface BookingsEmptyStateProps {
  searchTerm: string;
  selectedStatus: string;
  dateRange: any;
  onClearFilters: () => void;
}

export const BookingsEmptyState: React.FC<BookingsEmptyStateProps> = ({
  searchTerm,
  selectedStatus,
  dateRange,
  onClearFilters
}) => {
  const hasFilters = searchTerm || selectedStatus !== "all" || dateRange;
  
  return (
    <div className="text-center section-spacing-md bg-white dark:bg-gray-800 rounded-md border shadow-sm">
      <p className="text-gray-500 dark:text-gray-400">No bookings found matching your filters</p>
      {hasFilters && (
        <Button
          variant="outline"
          className="mt-4"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};
