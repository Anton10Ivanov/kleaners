
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { generateTimeOptions, isTimeBeforeStart } from '@/utils/timeUtils';
import { toast } from 'sonner';
import { DaysAvailability } from '@/hooks/useProviderAvailability';

interface TimeRange {
  id: number;
  day: string;
  start: string;
  end: string;
}

interface WeeklyScheduleProps {
  form: UseFormReturn<any>;
  availableDays: DaysAvailability;
  timeRanges: TimeRange[];
  toggleDayAvailability: (day: string, value: boolean) => void;
  updateTimeRange: (id: number, field: 'start' | 'end', value: string) => void;
  addTimeRange: (day: string) => void;
  removeTimeRange: (id: number) => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  form,
  availableDays,
  timeRanges,
  toggleDayAvailability,
  updateTimeRange,
  addTimeRange,
  removeTimeRange
}) => {
  const timeOptions = generateTimeOptions();
  
  // Day labels for display
  const dayLabels: { [key: string]: string } = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
  };
  
  // Get time ranges for a specific day
  const getTimeRangesForDay = (day: string) => {
    return timeRanges.filter(range => range.day === day);
  };
  
  // Handle changes to end time and validate it's after start time
  const handleEndTimeChange = (id: number, value: string, startTime: string) => {
    if (isTimeBeforeStart(value, startTime)) {
      toast.error("End time must be after start time");
      return;
    }
    updateTimeRange(id, 'end', value);
  };
  
  return (
    <div className="form-spacing-loose">
      {Object.keys(availableDays).map(day => (
        <div key={day} className="form-spacing-relaxed pb-4 border-b last:border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`available-${day}`} 
                checked={availableDays[day]} 
                onCheckedChange={(checked) => toggleDayAvailability(day, checked as boolean)} 
              />
              <label htmlFor={`available-${day}`} className="text-sm font-medium">
                {dayLabels[day]}
              </label>
            </div>
            
            {/* Add time range button */}
            {availableDays[day] && (
              <Button 
                type="button"
                variant="ghost" 
                size="sm" 
                onClick={() => addTimeRange(day)}
                className="h-8 text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Time
              </Button>
            )}
          </div>
          
          {/* Time range selectors for this day */}
          {availableDays[day] && (
            <div className="form-spacing-tight">
              {getTimeRangesForDay(day).length > 0 ? (
                getTimeRangesForDay(day).map((range) => (
                  <div key={range.id} className="flex items-center space-x-2">
                    <div>
                      <select
                        className="p-2 rounded-md border text-sm w-28"
                        value={range.start}
                        onChange={(e) => updateTimeRange(range.id, 'start', e.target.value)}
                      >
                        {timeOptions.map(time => (
                          <option key={`start-${time}`} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <span className="text-muted-foreground">to</span>
                    <div>
                      <select
                        className="p-2 rounded-md border text-sm w-28"
                        value={range.end}
                        onChange={(e) => handleEndTimeChange(range.id, e.target.value, range.start)}
                      >
                        {timeOptions.map(time => (
                          <option key={`end-${time}`} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTimeRange(range.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No time slots added yet</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
