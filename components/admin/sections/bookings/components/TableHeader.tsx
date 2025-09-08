
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { SortField, SortOrder } from '../types';

interface TableHeaderProps {
  sortField: SortField;
  sortOrder: SortOrder;
  toggleSort: (field: SortField) => void;
}

export const BookingsTableHeader: React.FC<TableHeaderProps> = ({
  sortField,
  sortOrder,
  toggleSort,
}) => {
  // Render the sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField === field) {
      return (
        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[180px]">
          <Button
            variant="ghost"
            onClick={() => toggleSort('date')}
            className="font-medium flex items-center"
          >
            Date {renderSortIndicator('date')}
          </Button>
        </TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Service</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>
          <Button
            variant="ghost"
            onClick={() => toggleSort('total_price')}
            className="font-medium flex items-center"
          >
            Price {renderSortIndicator('total_price')}
          </Button>
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Provider</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
