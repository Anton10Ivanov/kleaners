
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface BookingFiltersProps {
  /** Current filter value for booking status */
  statusFilter: string;
  
  /** Callback for when status filter changes */
  onStatusChange: (value: string) => void;
  
  /** Current search query */
  searchQuery: string;
  
  /** Callback for when search query changes */
  onSearchChange: (value: string) => void;
}

/**
 * BookingFilters Component
 * 
 * Provides filtering options for bookings, including status filtering and search.
 * 
 * @param {BookingFiltersProps} props - Component props
 * @returns {JSX.Element} Booking filters component
 */
export function BookingFilters({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange
}: BookingFiltersProps): JSX.Element {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10"
          aria-label="Search bookings"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bookings</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
