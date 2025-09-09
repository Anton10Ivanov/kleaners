
import { useState, useEffect } from "react";
import { Frequency } from '@/schemas/booking';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Check } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking';

interface FrequencyTimeSelectorProps {
  form: UseFormReturn<BookingFormData>;
}

export function FrequencyTimeSelector({ form }: FrequencyTimeSelectorProps) {
  const frequency = form.watch("frequency");
  const weekdayPreference = form.watch("weekdayPreference") as string;
  const timePreference = form.watch("timePreference") as string;
  
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  useEffect(() => {
    // Show additional options only for recurring frequencies
    if (frequency === Frequency.Weekly || 
        frequency === Frequency.BiWeekly || 
        frequency === Frequency.Monthly) {
      setShowAdditionalOptions(true);
    } else {
      setShowAdditionalOptions(false);
    }
  }, [frequency]);

  const weekdays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
  ];

  const timeSlots = [
    { id: "morning", label: "Morning (8am-12pm)" },
    { id: "afternoon", label: "Afternoon (12pm-4pm)" },
    { id: "evening", label: "Evening (4pm-8pm)" },
  ];

  const handleFrequencyChange = (value: string) => {
    form.setValue("frequency", value as Frequency);
  };

  const handleWeekdayChange = (value: string) => {
    form.setValue("weekdayPreference", value);
  };

  const handleTimeChange = (value: string) => {
    form.setValue("timePreference", value);
  };

  return (
    <div className="form-spacing-loose">
      <div className="form-spacing-tight">
        <Label htmlFor="frequency">How often do you need cleaning?</Label>
        <Select
          value={frequency || undefined}
          onValueChange={handleFrequencyChange}
        >
          <SelectTrigger id="frequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Frequency.OneTime}>One-time cleaning</SelectItem>
            <SelectItem value={Frequency.Weekly}>Weekly</SelectItem>
            <SelectItem value={Frequency.BiWeekly}>Bi-weekly</SelectItem>
            <SelectItem value={Frequency.Monthly}>Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showAdditionalOptions && (
        <>
          <div className="form-spacing-tight">
            <Label>Preferred day of the week</Label>
            <RadioGroup
              value={weekdayPreference || ""}
              onValueChange={handleWeekdayChange}
              className="grid grid-cols-2 md:grid-cols-5 gap-2"
            >
              {weekdays.map((day) => (
                <Label
                  key={day.id}
                  htmlFor={day.id}
                  className={cn(
                    "flex items-center justify-center space-x-2 rounded-md border card-spacing-xs cursor-pointer",
                    weekdayPreference === day.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input"
                  )}
                >
                  <RadioGroupItem value={day.id} id={day.id} className="sr-only" />
                  {weekdayPreference === day.id && (
                    <Check className="w-4 h-4 mr-1" />
                  )}
                  <span>{day.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="form-spacing-tight">
            <Label>Preferred time of day</Label>
            <RadioGroup
              value={timePreference || ""}
              onValueChange={handleTimeChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-2"
            >
              {timeSlots.map((slot) => (
                <Label
                  key={slot.id}
                  htmlFor={slot.id}
                  className={cn(
                    "flex items-center justify-center space-x-2 rounded-md border card-spacing-xs cursor-pointer",
                    timePreference === slot.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input"
                  )}
                >
                  <RadioGroupItem value={slot.id} id={slot.id} className="sr-only" />
                  {timePreference === slot.id && (
                    <Check className="w-4 h-4 mr-1" />
                  )}
                  <span>{slot.label}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
}
