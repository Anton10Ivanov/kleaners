
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
  { label: 'Morning', value: 'morning', description: '7:00–12:00' },
  { label: 'Afternoon', value: 'afternoon', description: '12:00–17:00' },
  { label: 'Evening', value: 'evening', description: '17:00–20:00' }
];

export const FrequencyTimeSelector = ({ form }: FrequencyTimeSelectorProps) => {
  const frequency = form.watch('frequency');
  const selectedDays = form.watch('selectedDays') || [];
  const timeSlots = form.watch('timeSlots') || {};
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

  const handleTimeSelect = (day: string, time: string) => {
    const timeSlots = { ...form.getValues('timeSlots') };
    timeSlots[day] = time;
    form.setValue('timeSlots', timeSlots);

    // If this is the first time selection, ask user if they want to apply it to all days
    const selectedTimeSlots = Object.values(timeSlots).filter(Boolean);
    if (selectedTimeSlots.length === 1) {
      const confirmed = window.confirm(`Would you like to apply ${TIME_SLOTS.find(slot => slot.value === time)?.label} to all selected days?`);
      if (confirmed) {
        selectedDays.forEach(selectedDay => {
          timeSlots[selectedDay] = time;
        });
        form.setValue('timeSlots', timeSlots);
        toast.success("Time applied to all selected days");
      }
    }
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
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDaySelect(day)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
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
            <div className={`grid ${selectedDays.length > 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {selectedDays.map((day) => (
                <div key={day} className="p-4 border rounded-lg bg-gray-50">
                  <FormField
                    control={form.control}
                    name={`timeSlots.${day}`}
                    render={() => (
                      <FormItem className="space-y-3">
                        <FormLabel>{day}</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-2">
                            {TIME_SLOTS.map((slot) => (
                              <Button
                                key={slot.value}
                                type="button"
                                variant={timeSlots[day] === slot.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleTimeSelect(day, slot.value)}
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
