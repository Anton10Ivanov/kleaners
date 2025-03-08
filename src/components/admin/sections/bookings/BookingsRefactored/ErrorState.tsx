
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface ErrorStateProps {
  onRefresh: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRefresh }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border p-8 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h3 className="text-lg font-medium mb-2">Failed to load bookings</h3>
      <p className="text-muted-foreground mb-4">
        There was an error loading the bookings. Please try again.
      </p>
      <Button onClick={onRefresh} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};
