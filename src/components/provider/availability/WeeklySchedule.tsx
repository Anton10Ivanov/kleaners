
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Save, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateTimeOptions, isTimeBeforeStart } from '../../../utils/timeUtils';
import { useForm } from 'react-hook-form';
import { useProviderAvailability, DaysAvailability } from '@/hooks/useProviderAvailability';

interface TimeRange {
  id: number;
  day: string;
  start: string;
  end: string;
}

export const WeeklySchedule = () => {
  const form = useForm();
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { id: 1, day: 'monday', start: '09:00', end: '17:00' },
    { id: 2, day: 'wednesday', start: '10:00', end: '16:00' },
  ]);
  
  const [availableDays, setAvailableDays] = useState<DaysAvailability>({
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: false,
  });
  
  const toggleDayAvailability = (day: string, value: boolean) => {
    setAvailableDays(prev => ({
      ...prev,
      [day]: value
    }));
  };
  
  const addTimeRange = (day: string) => {
    const newId = timeRanges.length > 0 
      ? Math.max(...timeRanges.map(r => r.id)) + 1 
      : 1;
      
    setTimeRanges([
      ...timeRanges,
      { id: newId, day, start: '09:00', end: '17:00' }
    ]);
  };
  
  const removeTimeRange = (id: number) => {
    setTimeRanges(timeRanges.filter(range => range.id !== id));
  };
  
  const updateTimeRange = (id: number, field: 'start' | 'end', value: string) => {
    setTimeRanges(timeRanges.map(range => 
      range.id === id ? { ...range, [field]: value } : range
    ));
  };
  
  const saveAvailability = () => {
    console.log('Saving availability:', { availableDays, timeRanges });
    // Here you would call the API to save the availability
  };
  
  // Array of weekdays excluding Sunday, grouped into pairs for the layout
  const weekdayGroups = [
    ['monday', 'tuesday'],
    ['wednesday', 'thursday'],
    ['friday', 'saturday']
  ];

  return (
    <Form {...form}>
      <div className="space-y-4">
        {weekdayGroups.map((dayGroup, groupIndex) => (
          <div key={groupIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayGroup.map((day) => (
              <div key={day} className="p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between mb-4">
                  <FormField
                    control={form.control}
                    name={day as any}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={availableDays[day as keyof typeof availableDays]}
                            onCheckedChange={(checked) => {
                              toggleDayAvailability(day, checked as boolean);
                              field.onChange(checked);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-base capitalize font-medium">
                          {day}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  {availableDays[day as keyof typeof availableDays] && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => addTimeRange(day)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Time
                    </Button>
                  )}
                </div>
                
                {availableDays[day as keyof typeof availableDays] && (
                  <div className="grid gap-2 pl-6">
                    {timeRanges
                      .filter(range => range.day === day)
                      .map(range => (
                        <div key={range.id} className="flex items-center gap-2">
                          <Select
                            value={range.start}
                            onValueChange={(value) => updateTimeRange(range.id, 'start', value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Start" />
                            </SelectTrigger>
                            <SelectContent>
                              {generateTimeOptions().map(time => (
                                <SelectItem key={`start-${time}`} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <span>to</span>
                          
                          <Select
                            value={range.end}
                            onValueChange={(value) => updateTimeRange(range.id, 'end', value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="End" />
                            </SelectTrigger>
                            <SelectContent>
                              {generateTimeOptions().map(time => (
                                <SelectItem 
                                  key={`end-${time}`} 
                                  value={time}
                                  disabled={isTimeBeforeStart(time, range.start)}
                                >
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTimeRange(range.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        
        <div className="flex justify-between items-center mt-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-[#D946EF] text-[#D946EF] hover:bg-[#FFDEE2]/10"
            onClick={() => window.dispatchEvent(new CustomEvent('open-vacation-dialog'))}
          >
            <CalendarIcon className="h-4 w-4" />
            Request Vacation
          </Button>
          
          <Button 
            onClick={saveAvailability} 
            className="border-2 border-[#0EA5E9] bg-white text-[#0EA5E9] hover:bg-[#0EA5E9]/10"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Schedule
          </Button>
        </div>
      </div>
    </Form>
  );
};
