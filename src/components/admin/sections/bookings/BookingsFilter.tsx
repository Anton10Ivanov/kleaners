
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { BookingStatus, statusColors } from "./types";

interface BookingsFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStatus: BookingStatus | null;
  setSelectedStatus: (status: BookingStatus | null) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
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
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>
      <RadioGroup
        defaultValue={selectedStatus || "all"}
        onValueChange={(value) => setSelectedStatus(value === "all" ? null : value as BookingStatus)}
        className="flex flex-wrap gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all">All</Label>
        </div>
        {Object.keys(statusColors).map((status) => (
          <div key={status} className="flex items-center space-x-2">
            <RadioGroupItem value={status} id={status} />
            <Label htmlFor={status} className="capitalize">{status}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

