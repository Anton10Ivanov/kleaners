
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface FrequencyTimeSelectorProps {
  form: UseFormReturn<BookingFormData>;
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const TIME_SLOTS = [
  { label: 'Anytime', value: 'anytime' },
  { label: 'Morning (7:00–12:00)', value: 'morning' },
  { label: 'Afternoon (12:00–17:00)', value: 'afternoon' },
  { label: 'Evening (17:00–20:00)', value: 'evening' }
];

export const FrequencyTimeSelector = ({ form }: FrequencyTimeSelectorProps) => {
  const frequency = form.watch('frequency');
  const selectedDays = form.watch('selectedDays') || [];
  const isCustom = frequency === Frequency.Custom;
  const isWeekly = frequency === Frequency.Weekly;

  const handleDaySelect = (day: string) => {
    const currentDays = form.getValues('selectedDays') || [];
    
    if (isWeekly && currentDays.length >= 1 && !currentDays.includes(day)) {
      toast.error("Weekly cleaning allows only one day selection");
      return;
    }

    let newDays: string[];
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = isWeekly ? [day] : [...currentDays, day];
    }
    
    form.setValue('selectedDays', newDays);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Preferred Days & Times</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {DAYS.map((day) => (
            <FormField
              key={day}
              control={form.control}
              name="selectedDays"
              render={() => (
                <Select
                  value={selectedDays.includes(day) ? day : undefined}
                  onValueChange={() => handleDaySelect(day)}
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

        {isCustom ? (
          <div className="space-y-4">
            {selectedDays.map((day) => (
              <div key={day} className="p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`timeSlots.${day}`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{day} Time Preference</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <div key={slot.value} className="flex items-center space-x-3">
                              <RadioGroupItem value={slot.value} id={`${day}-${slot.value}`} />
                              <Label htmlFor={`${day}-${slot.value}`}>{slot.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      {field.value === 'exact' && (
                        <Input
                          type="time"
                          min="07:00"
                          max="20:00"
                          onChange={(e) => form.setValue(`exactTimes.${day}`, e.target.value)}
                          className="mt-2 w-full sm:w-auto"
                        />
                      )}
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <FormField
            control={form.control}
            name="preferredTime"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Preferred Time</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <div key={slot.value} className="flex items-center space-x-3">
                        <RadioGroupItem value={slot.value} id={slot.value} />
                        <Label htmlFor={slot.value}>{slot.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
};

