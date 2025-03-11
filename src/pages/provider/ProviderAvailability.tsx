
import { useTitle } from '@/hooks/useTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock } from 'lucide-react';
import { ServiceAreasTab } from '@/components/provider/availability/ServiceAreasTab';

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
  
  const scheduleForm = useProviderAvailability().form;
  
  return (
    <div className="space-y-8 pb-16 md:pb-0 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            Availability Management
          </h1>
          <p className="text-muted-foreground">Set your working hours and service areas for optimal client matching</p>
        </div>
        <Button 
          onClick={() => setVacationDialogOpen(true)}
          className="bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 transition-all font-medium"
        >
          Request Vacation
        </Button>
      </div>
      
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-2 mb-4">
          <TabsTrigger value="schedule" className="text-sm px-6">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="service-areas" className="text-sm px-6">Service Areas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="pt-2">
          <Card className="border shadow-sm bg-card hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                Weekly Working Hours
              </CardTitle>
              <CardDescription>Set your regular working hours for each day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklySchedule
                form={scheduleForm}
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
        </TabsContent>
        
        <TabsContent value="service-areas" className="pt-2">
          <ServiceAreasTab />
        </TabsContent>
      </Tabs>
      
      <VacationRequestDialog 
        open={vacationDialogOpen}
        onOpenChange={setVacationDialogOpen}
        onVacationRequest={handleVacationRequest}
      />
    </div>
  );
};

export default ProviderAvailability;
