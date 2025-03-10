
import { useState, useCallback, memo } from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";

interface DatePickerWithRangeProps {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export const DatePickerWithRange = memo(({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Format the date for display
  const formatDateRange = useCallback(() => {
    if (date?.from) {
      if (date.to) {
        return `${format(date.from, "LLL dd")} - ${format(date.to, "LLL dd, y")}`;
      }
      return format(date.from, "LLL dd, y");
    }
    return "Select date range";
  }, [date]);

  const handleSelect = useCallback((newDate: DateRange | undefined) => {
    setDate(newDate);
    // Close the popover after selection on mobile
    if (isMobile && newDate?.to) {
      setTimeout(() => setIsPopoverOpen(false), 300);
    }
  }, [isMobile, setDate]);

  const handleClear = useCallback(() => {
    setDate(undefined);
    setIsPopoverOpen(false);
  }, [setDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal transition-all",
              !date && "text-muted-foreground",
              date && "text-foreground border-primary/50"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="truncate">{formatDateRange()}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn(
            "w-auto p-0",
            isMobile && "min-w-[300px]"
          )} 
          align={isMobile ? "center" : "start"}
          sideOffset={isMobile ? 8 : 4}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : 2}
            className="rounded-md border dark:border-gray-700"
          />
          {isMobile && (
            <div className="p-3 border-t flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsPopoverOpen(false)}
              >
                Apply
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
});

DatePickerWithRange.displayName = "DatePickerWithRange";
