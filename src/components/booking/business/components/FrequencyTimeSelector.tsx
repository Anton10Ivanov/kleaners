
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FrequencyTimeSelectorProps {
  form: UseFormReturn<BookingFormData>;
}

export const FrequencyTimeSelector = ({ form }: FrequencyTimeSelectorProps) => {
  const frequency = form.watch('frequency');
  const selectedDays = useMemo(() => 
    orderDaysChronologically([...(form.watch('selectedDays') || [])], DAYS),
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
      form.setValue('selectedDays', orderDaysChronologically(newDays, DAYS), { shouldDirty: true });
    });
  };

  const handleTimeSelect = (day: string, time: string) => {
    const currentTimeSlots = { ...form.getValues('timeSlots') };
    currentTimeSlots[day] = time;
    
    requestAnimationFrame(() => {
      form.setValue('timeSlots', currentTimeSlots, { shouldDirty: true });
    });
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
                    <p>Providing a key allows our cleaners to start immediately without waiting for someone to let them in.</p>
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

          <div className="space-y-4">
            <Label>Start anytime after</Label>
            <Select
              value={form.watch('preferredTime') || ''}
              onValueChange={(value) => form.setValue('preferredTime', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select start time" />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="contact-toggle">Contact for schedule specification</Label>
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
