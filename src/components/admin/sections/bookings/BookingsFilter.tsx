
import { useState, useEffect } from "react";
import { Search, FilterX, Filter } from "lucide-react";
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
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const hasFilters = searchTerm || selectedStatus || dateRange;
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // For mobile filters
  const [mobileSearchTerm, setMobileSearchTerm] = useState(searchTerm);
  const [mobileSelectedStatus, setMobileSelectedStatus] = useState<BookingStatus | null>(selectedStatus);
  const [mobileDateRange, setMobileDateRange] = useState<DateRange | undefined>(dateRange);
  
  // Update mobile filters when main filters change
  useEffect(() => {
    setMobileSearchTerm(searchTerm);
    setMobileSelectedStatus(selectedStatus);
    setMobileDateRange(dateRange);
  }, [searchTerm, selectedStatus, dateRange]);
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedStatus(null);
    setDateRange(undefined);
    
    // Reset mobile filters as well
    setMobileSearchTerm("");
    setMobileSelectedStatus(null);
    setMobileDateRange(undefined);
  };
  
  const applyMobileFilters = () => {
    setSearchTerm(mobileSearchTerm);
    setSelectedStatus(mobileSelectedStatus);
    setDateRange(mobileDateRange);
  };

  if (isMobile) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md border shadow-sm">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4" />
                {hasFilters && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {(selectedStatus ? 1 : 0) + (dateRange ? 1 : 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] sm:h-[60vh]">
              <SheetHeader className="text-left">
                <SheetTitle>Filter Bookings</SheetTitle>
                <SheetDescription>
                  Apply filters to find specific bookings
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search by name or email..."
                      className="pl-8"
                      value={mobileSearchTerm}
                      onChange={(e) => setMobileSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={mobileSelectedStatus || ""}
                    onValueChange={(value) =>
                      setMobileSelectedStatus(value ? (value as BookingStatus) : null)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <DatePickerWithRange 
                    date={mobileDateRange} 
                    setDate={setMobileDateRange} 
                  />
                </div>
              </div>
              
              <SheetFooter className="mt-6 flex justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileSearchTerm("");
                    setMobileSelectedStatus(null);
                    setMobileDateRange(undefined);
                  }}
                  className="flex-1"
                >
                  <FilterX className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <SheetClose asChild>
                  <Button 
                    onClick={applyMobileFilters}
                    className="flex-1"
                  >
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        {hasFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedStatus && (
              <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Status: {selectedStatus}
              </div>
            )}
            {dateRange?.from && (
              <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Date: {dateRange.from.toLocaleDateString()} 
                {dateRange.to && ` - ${dateRange.to.toLocaleDateString()}`}
              </div>
            )}
            
            <Button
              variant="ghost"
              onClick={handleResetFilters}
              size="sm"
              className="h-5 px-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md border shadow-sm space-y-4 transition-all duration-300">
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
      </div>
      
      {hasFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            size="sm"
            className="text-sm transition-all hover:bg-destructive/10 hover:text-destructive"
          >
            <FilterX className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
