
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateTimeOptions } from "../utils/timeUtils";

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
  const timeOptions = generateTimeOptions();

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <FormField
        control={form.control}
        name={`timeSlots.${day}`}
        render={() => (
          <FormItem className="space-y-3">
            <FormLabel>{day}</FormLabel>
            <FormControl>
              <Select
                value={timeSlots[day] || ""}
                onValueChange={(value) => onTimeSelect(day, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
