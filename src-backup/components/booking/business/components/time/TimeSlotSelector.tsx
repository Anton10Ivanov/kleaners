
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { TimeSlider } from "@/components/ui/time-slider";

interface TimeSlotSelectorProps {
  form: UseFormReturn<BookingFormData>;
  day: string;
  timeSlots: Record<string, string>;
  onTimeSelect: (day: string, time: string) => void;
}

export const TimeSlotSelector = ({
  form,
  day,
  timeSlots,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  const currentTime = timeSlots[day] || '08:00';

  const handleTimeChange = (time: string) => {
    onTimeSelect(day, time);
  };

  return (
    <div className="card-spacing-sm border rounded-lg bg-gray-50 dark:bg-gray-800/50 form-spacing-relaxed">
      <FormField
        control={form.control}
        name={`timeSlots.${day}` as any}
        render={() => (
          <FormItem className="form-spacing-normal">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="text-sm font-medium">{day}</FormLabel>
            </div>
            <FormControl>
              <TimeSlider
                value={currentTime}
                onChange={handleTimeChange}
                className="w-full"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
