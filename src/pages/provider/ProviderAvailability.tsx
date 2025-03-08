
import { useState } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CalendarView } from '@/components/provider/availability/CalendarView';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';

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
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            unavailableDates={unavailableDates}
            toggleDateUnavailable={toggleDateUnavailable}
            saveAvailability={saveAvailability}
          />
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          <WeeklySchedule
            form={form}
            availableDays={availableDays}
            timeRanges={timeRanges}
            toggleDayAvailability={toggleDayAvailability}
            addTimeRange={addTimeRange}
            removeTimeRange={removeTimeRange}
            updateTimeRange={updateTimeRange}
            saveAvailability={saveAvailability}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderAvailability;
