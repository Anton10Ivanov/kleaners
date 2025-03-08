
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateTimeOptions, isTimeBeforeStart } from '../../../utils/timeUtils';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySettings {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface WeeklySchedule {
  monday: DaySettings;
  tuesday: DaySettings;
  wednesday: DaySettings;
  thursday: DaySettings;
  friday: DaySettings;
  saturday: DaySettings;
  sunday: DaySettings;
}

interface TimeRangeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TimeRangeSelector = ({
  open,
  onOpenChange
}: TimeRangeSelectorProps) => {
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    monday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
    tuesday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
    wednesday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
    thursday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
    friday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
    saturday: { enabled: false, timeSlots: [{ start: '09:00', end: '17:00' }] },
    sunday: { enabled: false, timeSlots: [{ start: '09:00', end: '17:00' }] },
  });

  const toggleDay = (day: keyof WeeklySchedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const addTimeSlot = (day: keyof WeeklySchedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [
          ...prev[day].timeSlots,
          { start: '09:00', end: '17:00' }
        ]
      }
    }));
  };

  const removeTimeSlot = (day: keyof WeeklySchedule, index: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (
    day: keyof WeeklySchedule,
    index: number,
    field: 'start' | 'end',
    value: string
  ) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const saveSchedule = () => {
    console.log('Saving schedule:', schedule);
    onOpenChange(false);
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Set Working Hours</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {days.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={schedule[key].enabled}
                    onCheckedChange={() => toggleDay(key)}
                    id={`enable-${key}`}
                  />
                  <Label htmlFor={`enable-${key}`} className="font-medium">{label}</Label>
                </div>
                
                {schedule[key].enabled && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addTimeSlot(key)}
                    className="h-8"
                  >
                    Add Time Slot
                  </Button>
                )}
              </div>
              
              {schedule[key].enabled && (
                <div className="pl-6 space-y-2">
                  {schedule[key].timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        value={slot.start}
                        onValueChange={(value) => updateTimeSlot(key, index, 'start', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Start" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateTimeOptions().map(time => (
                            <SelectItem key={`${key}-start-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <span>to</span>
                      
                      <Select
                        value={slot.end}
                        onValueChange={(value) => updateTimeSlot(key, index, 'end', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="End" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateTimeOptions().map(time => (
                            <SelectItem 
                              key={`${key}-end-${time}`} 
                              value={time}
                              disabled={isTimeBeforeStart(time, slot.start)}
                            >
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {schedule[key].timeSlots.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTimeSlot(key, index)}
                          className="h-8 px-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <Separator />
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={saveSchedule}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
