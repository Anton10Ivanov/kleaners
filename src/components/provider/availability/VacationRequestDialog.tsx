
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { LoaderCircle } from 'lucide-react';

interface VacationRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVacationRequest: (dateRange: DateRange) => Promise<void>;
}

export function VacationRequestDialog({ 
  open, 
  onOpenChange, 
  onVacationRequest 
}: VacationRequestDialogProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({ 
    from: undefined, 
    to: undefined 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const today = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(today.getMonth() + 2);
  
  const handleSubmit = async () => {
    if (!selectedRange || !selectedRange.from) return;
    
    try {
      setIsSubmitting(true);
      await onVacationRequest(selectedRange);
      onOpenChange(false);
      setSelectedRange({ from: undefined, to: undefined });
    } catch (error) {
      console.error('Error submitting vacation request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Vacation Time</DialogTitle>
          <DialogDescription>
            Select the dates you won't be available to provide services.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Calendar
            initialFocus
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            numberOfMonths={2}
            fromDate={today}
            toDate={twoMonthsFromNow}
            className="rounded-md border mx-auto"
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedRange?.from || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Request'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
