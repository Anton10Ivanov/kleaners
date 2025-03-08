
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { BookingStatus } from './types';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Search, X } from 'lucide-react';

export interface BookingsFilterProps {
  onStatusChange: (status: BookingStatus | 'all') => void;
  onSearchChange: (search: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  selectedStatus: BookingStatus | 'all';
  searchTerm: string;
  selectedDateRange: DateRange | undefined;
}

export const BookingsFilter: React.FC<BookingsFilterProps> = ({
  onStatusChange,
  onSearchChange,
  onDateRangeChange,
  selectedStatus,
  searchTerm,
  selectedDateRange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md border mb-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="status-filter" className="text-sm font-medium mb-1 block">
            Status
          </label>
          <Select
            value={selectedStatus}
            onValueChange={(value) => onStatusChange(value as BookingStatus | 'all')}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="search-filter" className="text-sm font-medium mb-1 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search-filter"
              placeholder="Search by client or address"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => onSearchChange("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Date Range</label>
          <DateRangePicker
            value={selectedDateRange}
            onChange={onDateRangeChange}
            placeholder="Select date range"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsFilter;
