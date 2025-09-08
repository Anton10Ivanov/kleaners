
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface BookingsErrorStateProps {
  error: Error;
  onRefresh: () => void;
}

export const BookingsErrorState: React.FC<BookingsErrorStateProps> = ({
  error,
  onRefresh
}) => {
  return (
    <div className="card-spacing-lg bg-white dark:bg-gray-800 rounded-md border shadow-sm">
      <div className="text-center section-spacing-xs">
        <p className="text-destructive font-medium">Failed to load bookings</p>
        <p className="text-muted-foreground text-sm mt-1">
          Please try refreshing the page
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
