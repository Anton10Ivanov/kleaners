
import { useForm } from 'react-hook-form';
import { useTitle } from '@/hooks/useTitle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CalendarView } from '@/components/provider/availability/CalendarView';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';

const ProviderAvailability = () => {
  useTitle('Availability Management');
  
  const {
    selectedTab,
    setSelectedTab,
    selectedDate,
    setSelectedDate,
    availableDays,
    timeRanges,
    unavailableDates,
    addTimeRange,
    removeTimeRange,
    updateTimeRange,
    toggleDayAvailability,
    toggleDateUnavailable
  } = useProviderAvailability();
  
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
  
  const saveAvailability = () => {
    // In a real app, this would send the data to the server
    console.log('Saving availability:', { availableDays, timeRanges, unavailableDates });
    toast.success('Availability settings saved successfully');
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
