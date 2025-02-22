
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { toast } from "sonner";
import { DaySelector } from "./days/DaySelector";
import { TimeSlotSelector } from "./time/TimeSlotSelector";
import { useMemo } from "react";

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

const orderDaysChronologically = (days: string[]) => {
  return [...days].sort((a, b) => {
    return DAYS.indexOf(a) - DAYS.indexOf(b);
  });
};

export const FrequencyTimeSelector = ({ form }: FrequencyTimeSelectorProps) => {
  const frequency = form.watch('frequency');
  const selectedDays = useMemo(() => 
    orderDaysChronologically(form.watch('selectedDays') || []),
    [form.watch('selectedDays')]
  );
  const timeSlots = form.watch('timeSlots') || {};

  const handleDaySelect = (day: string) => {
    const currentDays = form.getValues('selectedDays') || [];
    
    if (frequency === Frequency.Weekly) {
      requestAnimationFrame(() => {
        form.setValue('selectedDays', [day], { shouldDirty: true });
      });
      return;
    }

    let newDays: string[];
    if (currentDays.includes(day)) {
      newDays = currentDays.filter(d => d !== day);
    } else {
      newDays = [...currentDays, day];
    }
    
    requestAnimationFrame(() => {
      form.setValue('selectedDays', orderDaysChronologically(newDays), { shouldDirty: true });
    });
  };

  const handleTimeSelect = (day: string, time: string) => {
    const currentTimeSlots = { ...form.getValues('timeSlots') };
    currentTimeSlots[day] = time;
    
    requestAnimationFrame(() => {
      form.setValue('timeSlots', currentTimeSlots, { shouldDirty: true });
    });

    const selectedTimeSlots = Object.values(currentTimeSlots).filter(Boolean);
    if (selectedTimeSlots.length === 1) {
      const confirmed = window.confirm(`Would you like to apply ${TIME_SLOTS.find(slot => slot.value === time)?.label} to all selected days?`);
      if (confirmed) {
        const updatedTimeSlots = { ...currentTimeSlots };
        selectedDays.forEach(selectedDay => {
          updatedTimeSlots[selectedDay] = time;
        });
        requestAnimationFrame(() => {
          form.setValue('timeSlots', updatedTimeSlots, { shouldDirty: true });
          toast.success("Time applied to all selected days");
        });
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Preferred Days & Times</h3>
      
      <div className="space-y-6">
        <DaySelector
          form={form}
          days={DAYS}
          selectedDays={selectedDays}
          frequency={frequency}
          onDaySelect={handleDaySelect}
        />

        {selectedDays.length > 0 && (
          <div className="space-y-4">
            <div className={`grid ${selectedDays.length > 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {selectedDays.map((day) => (
                <TimeSlotSelector
                  key={day}
                  form={form}
                  day={day}
                  timeSlots={timeSlots}
                  availableTimeSlots={TIME_SLOTS}
                  onTimeSelect={handleTimeSelect}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
