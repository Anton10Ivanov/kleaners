
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuestionFiltersProps {
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({ 
  statusFilter, 
  setStatusFilter 
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
      >
        Pending
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
