
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface TimeSlot {
  label: string;
  value: string;
  description?: string;
}

interface TimeSlotSelectorProps {
  form: UseFormReturn<BookingFormData>;
  day: string;
  timeSlots: Record<string, string>;
  availableTimeSlots: TimeSlot[];
  onTimeSelect: (day: string, time: string) => void;
}

export const TimeSlotSelector = ({
  form,
  day,
  timeSlots,
  availableTimeSlots,
  onTimeSelect,
}: TimeSlotSelectorProps) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <FormField
        control={form.control}
        name={`timeSlots.${day}`}
        render={() => (
          <FormItem className="space-y-3">
            <FormLabel>{day}</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-2">
                {availableTimeSlots.map((slot) => (
                  <Button
                    key={slot.value}
                    type="button"
                    variant={timeSlots[day] === slot.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onTimeSelect(day, slot.value)}
                    className={`flex flex-col items-center justify-center h-auto py-2 ${
                      timeSlots[day] === slot.value 
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm font-medium">{slot.label}</span>
                    {slot.description && (
                      <span className="text-xs mt-1 opacity-80">
                        {slot.description}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
