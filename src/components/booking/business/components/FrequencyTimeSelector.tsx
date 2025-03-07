
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { toast } from "sonner";
import { DaySelector } from "./days/DaySelector";
import { TimeSlotSelector } from "./time/TimeSlotSelector";
import { useMemo } from "react";
import { DAYS } from "../constants/timeConstants";
import { orderDaysChronologically } from "../utils/timeUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InfoIcon } from "lucide-react";

interface FrequencyTimeSelectorProps {
  form: UseFormReturn<BookingFormData>;
}

export const FrequencyTimeSelector = ({ form }: FrequencyTimeSelectorProps) => {
  const frequency = form.watch('frequency');
  const selectedDays = useMemo(() => 
    orderDaysChronologically([...(form.watch('selectedDays') || [])], Array.from(DAYS)),
    [form.watch('selectedDays')]
  );
  const timeSlots = form.watch('timeSlots') || {};
  const dynamicScheduling = form.watch('contactForSchedule');

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
      form.setValue('selectedDays', orderDaysChronologically(newDays, Array.from(DAYS)), { shouldDirty: true });
    });
  };

  // Add validation for minimum days when attempting to proceed
  const validateDaysSelected = () => {
    if (frequency === Frequency.Custom && selectedDays.length < 2) {
      toast.error("Please select at least 2 days for custom schedule before proceeding");
      return false;
    }
    return true;
  };

  // Add effect to trigger validation when form is submitted
  form.register('selectedDays', {
    validate: () => {
      if (frequency === Frequency.Custom && (form.getValues('selectedDays')?.length || 0) < 2) {
        return "Please select at least 2 days for custom schedule";
      }
      return true;
    }
  });

  const handleTimeSelect = (day: string, time: string) => {
    const currentTimeSlots = { ...form.getValues('timeSlots') } || {};
    currentTimeSlots[day] = time;
    
    requestAnimationFrame(() => {
      form.setValue('timeSlots', currentTimeSlots, { shouldDirty: true });
    });

    const selectedTimeSlots = Object.values(currentTimeSlots).filter(Boolean);
    if (selectedTimeSlots.length === 1) {
      const confirmed = window.confirm(`Would you like to apply ${time} to all selected days?`);
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
        <div className="space-y-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="key-toggle">Provide key for faster service</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-[#F97316] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent 
                    className="bg-[#F97316] text-white border-none"
                    sideOffset={5}
                  >
                    <p>Rest assured, your key is protected under our key insurance policy, and we follow strict security protocols!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="key-toggle"
              onCheckedChange={(checked) => {
                form.setValue('provideKey', checked);
              }}
              checked={form.watch('provideKey') || false}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="contact-toggle">Dynamic scheduling needed</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-[#F97316] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent 
                    className="bg-[#F97316] text-white border-none"
                    sideOffset={5}
                  >
                    <p>Scheduling should be done week-to-week or for the whole month in advance</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="contact-toggle"
              onCheckedChange={(checked) => {
                form.setValue('contactForSchedule', checked);
              }}
              checked={form.watch('contactForSchedule') || false}
            />
          </div>
        </div>

        <DaySelector
          form={form}
          days={Array.from(DAYS)}
          selectedDays={selectedDays}
          frequency={frequency as Frequency}
          onDaySelect={handleDaySelect}
        />

        {selectedDays.length > 0 && !dynamicScheduling && (
          <div className="space-y-4">
            <div className={`grid ${selectedDays.length > 3 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
              {selectedDays.map((day) => (
                <TimeSlotSelector
                  key={day}
                  form={form}
                  day={day}
                  timeSlots={timeSlots}
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
