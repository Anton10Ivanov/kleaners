
import { useForm } from 'react-hook-form';
import { useTitle } from '@/hooks/useTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';

const ProviderAvailability = () => {
  useTitle('Availability Management');
  
  const {
    availableDays,
    timeRanges,
    addTimeRange,
    removeTimeRange,
    updateTimeRange,
    toggleDayAvailability,
    saveAvailability,
    vacationDialogOpen,
    setVacationDialogOpen,
    handleVacationRequest
  } = useProviderAvailability();
  
  const form = useForm({
    defaultValues: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Availability Management</h1>
          <p className="text-muted-foreground">Manage when you're available for cleaning jobs</p>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-[#D946EF] text-[#D946EF] hover:bg-[#FFDEE2]/10"
          onClick={() => setVacationDialogOpen(true)}
        >
          <CalendarIcon className="h-4 w-4" />
          Request Vacation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Set your regular working hours for each day of the week</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
      
      <VacationRequestDialog 
        open={vacationDialogOpen}
        onOpenChange={setVacationDialogOpen}
        onVacationRequest={handleVacationRequest}
      />
    </div>
  );
};

export default ProviderAvailability;
