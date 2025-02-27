
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus } from "./types";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

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
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Select
        value={selectedStatus || ""}
        onValueChange={(value) =>
          setSelectedStatus(value ? (value as BookingStatus) : null)
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-full md:w-auto">
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>
      {(searchTerm || selectedStatus || dateRange) && (
        <Button
          variant="ghost"
          onClick={() => {
            setSearchTerm("");
            setSelectedStatus(null);
            setDateRange(undefined);
          }}
          className="w-full md:w-auto"
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
};
