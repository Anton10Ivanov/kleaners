
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateTimeOptions, isTimeBeforeStart } from '../../../utils/timeUtils';
import { UseFormReturn } from 'react-hook-form';

interface TimeRange {
  id: number;
  day: string;
  start: string;
  end: string;
}

interface WeeklyScheduleProps {
  form: UseFormReturn<any>;
  availableDays: Record<string, boolean>;
  timeRanges: TimeRange[];
  toggleDayAvailability: (day: string, value: boolean) => void;
  addTimeRange: (day: string) => void;
  removeTimeRange: (id: number) => void;
  updateTimeRange: (id: number, field: 'start' | 'end', value: string) => void;
  saveAvailability: () => void;
}

export const WeeklySchedule = ({
  form,
  availableDays,
  timeRanges,
  toggleDayAvailability,
  addTimeRange,
  removeTimeRange,
  updateTimeRange,
  saveAvailability
}: WeeklyScheduleProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Availability</CardTitle>
        <CardDescription>Set your regular working hours for each day of the week</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-6">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day} className="space-y-4">
                <div className="flex items-center justify-between">
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
                        <FormLabel className="text-base capitalize">
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
                  <div className="pl-6 space-y-2">
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
            
            <Button onClick={saveAvailability}>
              <Save className="h-4 w-4 mr-2" />
              Save Weekly Schedule
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
