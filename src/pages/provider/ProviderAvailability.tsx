
import { useTitle } from '@/hooks/useTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';
import { CalendarClock, MapPin, Briefcase } from 'lucide-react';
import { ServiceAreasTab } from '@/components/provider/availability/ServiceAreasTab';
import { Box } from '@/components/layout/Box';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2 text-primary-hover">
            <div className="bg-primary/10 p-2 rounded-full">
              <CalendarClock className="h-6 w-6 text-primary" />
            </div>
            Availability Management
          </h1>
          <p className="text-muted-foreground">Set your working hours and service areas for optimal client matching</p>
        </div>
        <Button 
          onClick={() => setVacationDialogOpen(true)}
          className="bg-gradient-to-r from-[#D946EF] to-[#D946EF]/90 text-white hover:opacity-90 transition-all font-medium shadow-md"
        >
          Request Vacation
        </Button>
      </motion.div>
      
      <Box className="bg-white dark:bg-gray-800/60 rounded-xl shadow-sm mb-6">
        <div className="tabs-container overflow-hidden">
          <div className="tabs overflow-x-auto scrollbar-none flex border-b">
            <button className="tab-button py-3 px-6 border-b-2 border-primary text-primary font-medium flex items-center gap-2 transition-all">
              <CalendarClock className="h-4 w-4" />
              <span>Weekly Schedule</span>
            </button>
            <button className="tab-button py-3 px-6 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-all flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Service Areas</span>
            </button>
            <button className="tab-button py-3 px-6 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-all flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Work Preferences</span>
            </button>
          </div>
        </div>
      </Box>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="space-y-6"
      >
        <Card className="border shadow-md bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="text-xl flex items-center gap-2 text-primary-hover">
              <div className="bg-primary/10 p-2 rounded-full">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>
              Weekly Working Hours
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Set your regular working hours for each day of the week
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
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
        
        <ServiceAreasTab />
      </motion.div>
      
      <VacationRequestDialog 
        open={vacationDialogOpen}
        onOpenChange={setVacationDialogOpen}
        onVacationRequest={handleVacationRequest}
      />
    </div>
  );
};

export default ProviderAvailability;
