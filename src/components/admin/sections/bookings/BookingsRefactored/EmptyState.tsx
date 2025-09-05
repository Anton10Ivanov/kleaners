
import React from 'react';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border p-8 text-center">
      <div className="flex justify-center mb-4">
        <SearchX className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No bookings found</h3>
      
      {hasFilters ? (
        <>
          <p className="text-muted-foreground mb-4">
            No bookings match your current filters. Try changing or clearing your filters.
          </p>
          <Button onClick={onClearFilters} variant="outline">
            Clear All Filters
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">
          There are no bookings in the system yet. They will appear here once created.
        </p>
      )}
    </div>
  );
};
