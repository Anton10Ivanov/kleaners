
import { useState } from "react";
import { BookingStatus } from "./types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatus: BookingStatus | null;
  setSelectedStatus: (status: BookingStatus | null) => void;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

export const BookingsFilter = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  dateRange,
  setDateRange,
}: BookingsFilterProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border shadow-sm p-4 grid gap-4 md:grid-cols-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by name or email..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Select
        value={selectedStatus || "all"}
        onValueChange={(value) => 
          setSelectedStatus(value === "all" ? null : value as BookingStatus)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <DatePickerWithRange
        date={dateRange}
        setDate={setDateRange}
        className="min-w-[300px]"
      />
    </div>
  );
};
