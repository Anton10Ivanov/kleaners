
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { toast } from 'sonner';
import { CalendarClock } from 'lucide-react';

interface VacationRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVacationRequest: (dateRange: DateRange) => void;
}

export function VacationRequestDialog({
  open,
  onOpenChange,
  onVacationRequest
}: VacationRequestDialogProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  
  const handleSubmit = () => {
    if (dateRange?.from) {
      onVacationRequest(dateRange);
      toast.success("Vacation request submitted successfully");
      onOpenChange(false);
      setDateRange({ from: undefined, to: undefined });
    } else {
      toast.error("Please select at least one day");
    }
  };
  
  const today = new Date();
  const futureDate = addDays(today, 365);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-none shadow-xl">
        <DialogHeader className="space-y-3 pb-2">
          <div className="bg-[#FFDEE2]/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <CalendarClock className="h-6 w-6 text-[#D946EF]" />
          </div>
          <DialogTitle className="text-xl text-center">Request Vacation Time</DialogTitle>
          <DialogDescription className="text-center max-w-md mx-auto">
            Select the dates you would like to take vacation. You won't be assigned any cleaning jobs during this period.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={today}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            disabled={{ before: today }}
            fromDate={today}
            toDate={futureDate}
            className="rounded-md border mx-auto"
            classNames={{
              day_selected: "bg-[#D946EF] text-white hover:bg-[#D946EF]/90",
              day_range_middle: "bg-[#FFDEE2] text-[#D946EF]",
              day_today: "bg-accent text-accent-foreground",
            }}
          />
        </div>
        
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1 sm:flex-none bg-[#D946EF] text-white hover:bg-[#D946EF]/90"
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
