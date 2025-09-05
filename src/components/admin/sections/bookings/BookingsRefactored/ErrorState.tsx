
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  onRefresh: () => void;
  error: Error;
  title?: string;
  description?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRefresh,
  error,
  title = "Error loading data",
  description = "Failed to load data. Please try again.",
}) => {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-md border shadow-sm">
      <div className="text-center py-4">
        <p className="text-destructive font-medium">{title}</p>
        <p className="text-muted-foreground text-sm mt-1">
          {description}
        </p>
        <p className="text-xs text-muted-foreground mt-2 mb-4">
          {error.message}
        </p>
        <Button 
          variant="outline" 
          className="mt-2"
          onClick={onRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
