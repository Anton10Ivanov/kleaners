
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
    
    if (isWeekly) {
      form.setValue('selectedDays', [day]);
      return;
    }

    let newDays: string[];
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = [...currentDays, day];
    }
    
    form.setValue('selectedDays', newDays);
  };

  const applyTimeToAllDays = (time: string) => {
    const timeSlots = { ...form.getValues('timeSlots') };
    selectedDays.forEach(day => {
      timeSlots[day] = time;
    });
    form.setValue('timeSlots', timeSlots);
    toast.success("Time applied to all selected days");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Preferred Days & Times</h3>
      
      <div className="space-y-6">
        {isWeekly ? (
          <FormField
            control={form.control}
            name="selectedDays"
            render={() => (
              <Select
                value={selectedDays[0]}
                onValueChange={(day) => handleDaySelect(day)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map((day) => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        ) : isCustom ? (
          <div className="grid grid-cols-2 gap-4">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={`day-${day}`}
                  checked={selectedDays.includes(day)}
                  onCheckedChange={() => handleDaySelect(day)}
                />
                <Label htmlFor={`day-${day}`}>{day}</Label>
              </div>
            ))}
          </div>
        ) : (
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
        )}

        {selectedDays.length > 0 && (
          <div className="space-y-4">
            {selectedDays.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyTimeToAllDays('anytime')}
                >
                  Apply "Anytime" to all days
                </Button>
                {TIME_SLOTS.slice(1).map((slot) => (
                  <Button
                    key={slot.value}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => applyTimeToAllDays(slot.value)}
                  >
                    Apply {slot.label.split(' ')[0]} to all days
                  </Button>
                ))}
              </div>
            )}

            <div className={`grid ${selectedDays.length > 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {selectedDays.map((day) => (
                <div key={day} className="p-4 border rounded-lg bg-gray-50">
                  <FormField
                    control={form.control}
                    name={`timeSlots.${day}`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{day}</FormLabel>
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
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

