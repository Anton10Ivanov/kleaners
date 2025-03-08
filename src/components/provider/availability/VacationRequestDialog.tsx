
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Vacation Time</DialogTitle>
          <DialogDescription>
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
            className="rounded-md border"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex items-center gap-2 border-[#D946EF] text-[#D946EF] hover:bg-[#FFDEE2]/10 border"
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
