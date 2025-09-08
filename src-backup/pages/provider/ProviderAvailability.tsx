
import { useTitle } from '@/hooks/useTitle';
import { Button } from '@/components/ui/button';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';
import { CalendarClock, MapPin, Briefcase } from 'lucide-react';
import { ServiceAreasTab } from '@/components/provider/availability/ServiceAreasTab';
import { Box } from '@/components/layout/Box';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';

const ProviderAvailability = () => {
  useTitle('Availability Management');
  const isMobile = useMediaQuery("(max-width: 640px)");
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
    handleVacationRequest,
    form
  } = useProviderAvailability();
  
  const [activeTab, setActiveTab] = useState("schedule");
  
  return (
    <div className="form-spacing-loose sm:component-spacing-xl pb-16 md:pb-0 animate-fadeIn">
      <motion.div 
        className="px-1 sm:px-0" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 flex items-center gap-2 text-primary-hover">
            <div className="bg-primary/10 p-2 rounded-full">
              <CalendarClock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            Availability
          </h1>
          
        </div>
      </motion.div>
      
      <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Box className="bg-white dark:bg-gray-800/60 rounded-lg sm:rounded-xl shadow-sm mb-4 sm:mb-6 overflow-x-auto mx-1 sm:mx-0">
          <TabsList className="w-full justify-start h-auto card-spacing-none bg-transparent flex">
            <TabsTrigger value="schedule" className="section-spacing-xs.5 sm:py-3 px-3 sm:px-6 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium flex items-center gap-2 transition-all rounded-none whitespace-nowrap">
              <CalendarClock className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Hours</span>
            </TabsTrigger>
            <TabsTrigger value="areas" className="section-spacing-xs.5 sm:py-3 px-3 sm:px-6 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium flex items-center gap-2 transition-all rounded-none whitespace-nowrap">
              <MapPin className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Areas</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="section-spacing-xs.5 sm:py-3 px-3 sm:px-6 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-medium flex items-center gap-2 transition-all rounded-none whitespace-nowrap">
              <Briefcase className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Preferences</span>
            </TabsTrigger>
          </TabsList>
        </Box>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="form-spacing-relaxed sm:form-spacing-loose mx-1 sm:mx-0"
        >
          <TabsContent value="schedule" className="m-0 mt-4 sm:mt-6">
            <Card className="border shadow-md bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-primary/5 to-transparent card-spacing-sm sm:card-spacing-md">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-primary-hover">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                    <CalendarClock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  Weekly Working Hours
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Set your regular working hours for each day
                </CardDescription>
              </CardHeader>
              <CardContent className="card-spacing-sm sm:card-spacing-md">
                <WeeklySchedule 
                  form={form}
                  availableDays={availableDays} 
                  timeRanges={timeRanges} 
                  toggleDayAvailability={toggleDayAvailability}
                  updateTimeRange={updateTimeRange}
                  addTimeRange={addTimeRange}
                  removeTimeRange={removeTimeRange}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="areas" className="m-0 mt-4 sm:mt-6">
            <ServiceAreasTab />
          </TabsContent>
          
          <TabsContent value="preferences" className="m-0 mt-4 sm:mt-6">
            <Card className="border shadow-md bg-card hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-primary/5 to-transparent card-spacing-sm sm:card-spacing-md">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-primary-hover">
                    <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    Work Preferences
                  </CardTitle>
                  
                  <Button onClick={() => setVacationDialogOpen(true)} variant="outline" size="sm" className="gap-1.5 text-xs sm:text-sm">
                    Request Vacation
                  </Button>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  Define your work preferences and specializations
                </CardDescription>
              </CardHeader>
              <CardContent className="card-spacing-sm sm:card-spacing-md">
                <div className="text-center section-spacing-sm sm:section-spacing-md px-4 border border-dashed rounded-xl bg-muted/20">
                  <div className="bg-primary/10 p-2 sm:card-spacing-xs rounded-full w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 text-primary mx-auto opacity-80" />
                  </div>
                  <p className="text-muted-foreground font-medium">Work preferences coming soon</p>
                  <p className="text-sm text-muted-foreground mt-1">This feature is under development.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
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
