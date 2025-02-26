
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Clock } from "lucide-react";

interface TimeSlotSelectorProps {
  form: UseFormReturn<BookingFormData>;
  day: string;
  timeSlots: Record<string, string>;
  onTimeSelect: (day: string, time: string) => void;
}

const generateTimeSlots = () => {
  const slots: string[] = [];
  const start = 7; // 7 AM
  const end = 20; // 8 PM
  
  for (let hour = start; hour <= end; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  return slots;
};

export const TimeSlotSelector = ({
  form,
  day,
  timeSlots,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const availableTimeSlots = generateTimeSlots();

  const handleTimeClick = (time: string) => {
    onTimeSelect(day, time);
    setIsOpen(false);
  };

  return (
    <div className="p-2 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <FormField
        control={form.control}
        name={`timeSlots.${day}`}
        render={() => (
          <FormItem className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="text-sm font-medium">{day}</FormLabel>
            </div>
            <FormControl>
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-sm py-2 h-auto font-normal"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {timeSlots[day] || 'Select time'}
                </Button>
                {isOpen && (
                  <div className="absolute z-50 top-[calc(100%+4px)] left-0 w-full rounded-md border bg-white dark:bg-gray-800 shadow-lg">
                    <ScrollArea className="h-[200px]">
                      <div className="p-2">
                        {availableTimeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-sm py-2 h-auto font-normal mb-1",
                              timeSlots[day] === time && "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                            onClick={() => handleTimeClick(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

