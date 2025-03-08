
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyState = ({ hasFilters, onClearFilters }: EmptyStateProps) => {
  return (
    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-md border shadow-sm">
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
