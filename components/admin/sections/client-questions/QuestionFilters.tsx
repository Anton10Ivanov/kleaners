
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuestionFiltersProps {
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  pendingCount?: number;
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({ 
  statusFilter, 
  setStatusFilter,
  pendingCount = 0
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={statusFilter === 'all' ? 'default' : 'outline'} 
        onClick={() => setStatusFilter('all')}
      >
        All
      </Button>
      <Button 
        variant={statusFilter === 'pending' ? 'default' : 'outline'}
        onClick={() => setStatusFilter('pending')}
        className="relative"
      >
        Pending
        {pendingCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center card-spacing-none text-xs"
          >
            {pendingCount}
          </Badge>
        )}
      </Button>
      <Button 
        variant={statusFilter === 'answered' ? 'default' : 'outline'}
        onClick={() => setStatusFilter('answered')}
      >
        Answered
      </Button>
    </div>
  );
};
