
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {days.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <Button
              key={day}
              type="button"
              variant={isSelected ? "default" : "outline"}
              className={`h-12 flex items-center justify-between gap-2 transition-all ${
                isSelected ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
              }`}
              onClick={() => onDaySelect(day)}
            >
              <span>{day}</span>
              {isSelected && <Check className="h-4 w-4" />}
            </Button>
          );
        })}
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
      )}
    </div>
  );
};

