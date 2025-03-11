
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { DaysAvailability } from '@/hooks/useProviderAvailability';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useProviderSchedule } from '@/hooks/useProviderSchedule';

interface WeeklyScheduleProps {
  form: UseFormReturn<any>;
  availableDays: DaysAvailability;
  timeRanges: TimeRange[];
  toggleDayAvailability: (day: string, value: boolean) => void;
  updateTimeRange: (id: number, field: 'start' | 'end', value: string) => void;
}

interface TimeRange {
  id: number;
  day: string;
  start: string;
  end: string;
}

export const WeeklySchedule = ({
  form,
  availableDays,
  timeRanges,
  toggleDayAvailability,
  updateTimeRange,
}: WeeklyScheduleProps) => {
  const { saveSchedule, isLoading } = useProviderSchedule();
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  const handleSaveSchedule = async () => {
    const schedules = weekdays
      .filter(day => availableDays[day as keyof typeof availableDays])
      .map(day => {
        const range = timeRanges.find(r => r.day === day);
        return {
          day,
          start_time: range?.start || '09:00',
          end_time: range?.end || '17:00',
          is_available: true
        };
      });
    
    await saveSchedule(schedules);
  };

  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleTimeRangeChange = (day: string, values: number[]) => {
    const range = timeRanges.find(r => r.day === day);
    if (range) {
      updateTimeRange(range.id, 'start', convertMinutesToTime(values[0]));
      updateTimeRange(range.id, 'end', convertMinutesToTime(values[1]));
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="grid gap-4">
          {weekdays.map((day) => {
            const range = timeRanges.find(r => r.day === day);
            const startMinutes = range ? convertTimeToMinutes(range.start) : 540; // 9:00 AM
            const endMinutes = range ? convertTimeToMinutes(range.end) : 1020; // 5:00 PM

            return (
              <div 
                key={day}
                className="p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FormField
                      control={form.control}
                      name={day as any}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={availableDays[day as keyof typeof availableDays]}
                              onCheckedChange={(checked) => {
                                toggleDayAvailability(day, checked);
                                field.onChange(checked);
                              }}
                            />
                          </FormControl>
                          <Label className="capitalize font-medium">
                            {day}
                          </Label>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {availableDays[day as keyof typeof availableDays] && (
                  <div className="pl-2 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>{convertMinutesToTime(startMinutes)}</span>
                      <span>{convertMinutesToTime(endMinutes)}</span>
                    </div>
                    <Slider
                      value={[startMinutes, endMinutes]}
                      min={0}
                      max={1440}
                      step={30}
                      className="my-4"
                      onValueChange={(values) => handleTimeRangeChange(day, values)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSaveSchedule}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Schedule'}
          </Button>
        </div>
      </div>
    </Form>
  );
};
