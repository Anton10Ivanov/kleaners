
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
  const isCustom = frequency === Frequency.Custom;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Preferred Days & Times</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {DAYS.map((day) => (
            <FormField
              key={day}
              control={form.control}
              name={`selectedDays`}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(day)}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || [];
                        const newValue = checked
                          ? [...currentValue, day]
                          : currentValue.filter((val) => val !== day);
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <Label>{day}</Label>
                </FormItem>
              )}
            />
          ))}
        </div>

        {isCustom ? (
          <div className="space-y-4">
            {form.watch('selectedDays')?.map((day) => (
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
