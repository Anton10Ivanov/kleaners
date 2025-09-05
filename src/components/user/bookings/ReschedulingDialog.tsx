
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface ReschedulingDialogProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  handleReschedule: () => Promise<void>;
  isRescheduling: boolean;
}

export function ReschedulingDialog({
  selectedDate,
  setSelectedDate,
  handleReschedule,
  isRescheduling
}: ReschedulingDialogProps): JSX.Element {
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reschedule Booking</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select a new date and time
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'PPP') : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleReschedule}
              disabled={!selectedDate || isRescheduling}
            >
              {isRescheduling ? "Rescheduling..." : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
