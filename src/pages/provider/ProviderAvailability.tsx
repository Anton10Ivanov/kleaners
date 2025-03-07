
import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { format, addMinutes, parse, isAfter, isBefore } from 'date-fns';
import { Clock, CalendarIcon, Save, Plus, Trash2 } from 'lucide-react';

const ProviderAvailability = () => {
  useTitle('Availability Management');
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateEvents, setDateEvents] = useState<any[]>([]);
  
  // Mock availability data
  const [availableDays, setAvailableDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });
  
  const [timeRanges, setTimeRanges] = useState([
    { id: 1, day: 'monday', start: '09:00', end: '17:00' },
    { id: 2, day: 'tuesday', start: '09:00', end: '17:00' },
    { id: 3, day: 'wednesday', start: '09:00', end: '17:00' },
    { id: 4, day: 'thursday', start: '09:00', end: '17:00' },
    { id: 5, day: 'friday', start: '09:00', end: '17:00' },
  ]);
  
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  
  const form = useForm({
    defaultValues: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    }
  });
  
  const addTimeRange = (day: string) => {
    const newId = Math.max(0, ...timeRanges.map(r => r.id)) + 1;
    setTimeRanges([...timeRanges, { id: newId, day, start: '09:00', end: '17:00' }]);
  };
  
  const removeTimeRange = (id: number) => {
    setTimeRanges(timeRanges.filter(range => range.id !== id));
  };
  
  const updateTimeRange = (id: number, field: 'start' | 'end', value: string) => {
    setTimeRanges(timeRanges.map(range => 
      range.id === id ? { ...range, [field]: value } : range
    ));
  };
  
  const toggleDayAvailability = (day: string, value: boolean) => {
    setAvailableDays({ ...availableDays, [day]: value });
    
    if (!value) {
      // Remove all time ranges for this day when marked as unavailable
      setTimeRanges(timeRanges.filter(range => range.day !== day));
    } else if (value && !timeRanges.some(range => range.day === day)) {
      // Add a default time range when day is marked as available
      addTimeRange(day);
    }
  };
  
  const saveAvailability = () => {
    // In a real app, this would send the data to the server
    console.log('Saving availability:', { availableDays, timeRanges, unavailableDates });
    toast.success('Availability settings saved successfully');
  };
  
  const toggleDateUnavailable = (date: Date) => {
    if (unavailableDates.some(d => d.toDateString() === date.toDateString())) {
      setUnavailableDates(unavailableDates.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setUnavailableDates([...unavailableDates, date]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Availability Management</h1>
        <p className="text-muted-foreground">Manage when you're available for cleaning jobs</p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Select Dates
                  </CardTitle>
                  <CardDescription>Mark days as unavailable</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      unavailable: unavailableDates,
                    }}
                    modifiersStyles={{
                      unavailable: { backgroundColor: '#FEE2E2', color: '#991B1B' },
                    }}
                  />
                  
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => selectedDate && toggleDateUnavailable(selectedDate)}
                    >
                      {selectedDate && unavailableDates.some(d => d.toDateString() === selectedDate.toDateString())
                        ? 'Mark as Available'
                        : 'Mark as Unavailable'
                      }
                    </Button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={saveAvailability}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a Date'}
                  </CardTitle>
                  <CardDescription>
                    {selectedDate && unavailableDates.some(d => d.toDateString() === selectedDate.toDateString())
                      ? 'You are unavailable on this date'
                      : 'Manage your availability for this date'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate && unavailableDates.some(d => d.toDateString() === selectedDate.toDateString()) ? (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">You have marked this date as unavailable</p>
                      <Button 
                        className="mt-4" 
                        variant="outline"
                        onClick={() => toggleDateUnavailable(selectedDate)}
                      >
                        Make Available
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Available Time Slots</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => {/* Add time slot */}}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Time Slot
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <TimeRangeSelector />
                        <TimeRangeSelector />
                      </div>
                      
                      <Button onClick={saveAvailability}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TimeRangeSelector = () => {
  return (
    <div className="flex items-center space-x-2">
      <Select defaultValue="09:00">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Start" />
        </SelectTrigger>
        <SelectContent>
          {generateTimeOptions().map(time => (
            <SelectItem key={`slot-start-${time}`} value={time}>{time}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <span>to</span>
      
      <Select defaultValue="17:00">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="End" />
        </SelectTrigger>
        <SelectContent>
          {generateTimeOptions().map(time => (
            <SelectItem key={`slot-end-${time}`} value={time}>{time}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
};

// Helper functions
function generateTimeOptions() {
  const times = [];
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  
  for (let i = 6; i <= 22; i++) { // From 6:00 to 22:00
    for (let j = 0; j < 60; j += 30) { // 30 minute intervals
      const time = addMinutes(new Date(baseDate), i * 60 + j);
      times.push(format(time, 'HH:mm'));
    }
  }
  
  return times;
}

function isTimeBeforeStart(endTime: string, startTime: string) {
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  
  const startDate = parse(startTime, 'HH:mm', baseDate);
  const endDate = parse(endTime, 'HH:mm', baseDate);
  
  return isBefore(endDate, startDate) || endDate.getTime() === startDate.getTime();
}

export default ProviderAvailability;
