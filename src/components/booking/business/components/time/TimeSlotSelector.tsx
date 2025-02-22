
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
  const handleTimeChange = (time: string) => {
    onTimeSelect(day, time);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <FormField
        control={form.control}
        name={`timeSlots.${day}`}
        render={() => (
          <FormItem className="space-y-3">
            <FormLabel>{day}</FormLabel>
            <FormControl>
              <Input
                type="time"
                value={timeSlots[day] || ''}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
