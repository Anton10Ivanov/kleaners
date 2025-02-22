
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DaySelectorProps {
  form: UseFormReturn<BookingFormData>;
  days: string[];
  selectedDays: string[];
  frequency: Frequency;
  onDaySelect: (day: string) => void;
}

export const DaySelector = ({ form, days, selectedDays, frequency, onDaySelect }: DaySelectorProps) => {
  const isWeekly = frequency === Frequency.Weekly;
  const isCustom = frequency === Frequency.Custom;

  if (isWeekly) {
    return (
      <FormField
        control={form.control}
        name="selectedDays"
        render={() => (
          <Select
            value={selectedDays[0]}
            onValueChange={(day) => onDaySelect(day)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day} value={day}>{day}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    );
  }

  if (isCustom) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {days.map((day) => (
          <div key={day} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`day-${day}`}
              checked={selectedDays.includes(day)}
              onChange={() => onDaySelect(day)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor={`day-${day}`}>{day}</Label>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {days.map((day) => (
        <FormField
          key={day}
          control={form.control}
          name="selectedDays"
          render={() => (
            <Select
              value={selectedDays.includes(day) ? day : undefined}
              onValueChange={() => onDaySelect(day)}
            >
              <SelectTrigger
                className={`w-full ${selectedDays.includes(day) ? 'border-primary' : ''}`}
              >
                <SelectValue placeholder={day} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={day}>{day}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      ))}
    </div>
  );
};
