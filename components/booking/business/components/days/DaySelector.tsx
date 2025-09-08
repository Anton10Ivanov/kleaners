
import { useState } from "react";
import { Button } from '@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card";
import { Calendar } from '@/components/ui/calendar";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking";
import { Badge } from '@/components/ui/badge";

interface DaySelectorProps {
  form: UseFormReturn<BookingFormData>;
}

export function DaySelector({ form }: DaySelectorProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const selectedDates = (form.watch("selectedDates") as Date[]) || [];

  const handleSelect = (day: Date | undefined) => {
    if (!day) return;
    
    setDate(day);
    
    // Check if date already exists in the array
    const dateExists = selectedDates.some(
      (d) => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    
    // If date exists, remove it, otherwise add it
    if (dateExists) {
      const newDates = selectedDates.filter(
        (d) => format(d, 'yyyy-MM-dd') !== format(day, 'yyyy-MM-dd')
      );
      form.setValue("selectedDates", newDates);
    } else {
      form.setValue("selectedDates", [...selectedDates, day]);
    }
  };

  const isSelected = (day: Date) => {
    return selectedDates.some(
      (d) => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  const clearSelection = () => {
    form.setValue("selectedDates", []);
    setDate(undefined);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="card-spacing-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Cleaning Days</h3>
          {selectedDates.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearSelection}
            >
              Clear Selection
            </Button>
          )}
        </div>
        
        <div className="flex flex-col items-center form-spacing-relaxed">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(days) => {
              if (Array.isArray(days)) {
                form.setValue("selectedDates", days);
              }
            }}
            className="rounded-md border"
            disabled={{ before: new Date() }}
          />
          
          {selectedDates.length > 0 && (
            <div className="w-full">
              <p className="text-sm text-muted-foreground mb-2">Selected days ({selectedDates.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedDates.map((date, idx) => (
                  <Badge key={idx} variant="outline">
                    {format(date, 'MMM dd, yyyy')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
