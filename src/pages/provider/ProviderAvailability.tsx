
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { CalendarView } from '@/components/provider/availability/CalendarView';
import { ServiceAreasTab } from '@/components/provider/availability/ServiceAreasTab';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const ProviderAvailability = () => {
  const {
    selectedTab,
    setSelectedTab,
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Availability Management</h1>
        <Button 
          onClick={() => setVacationDialogOpen(true)}
          variant="outline"
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Request Time Off
        </Button>
      </div>

      <Tabs 
        defaultValue={selectedTab} 
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="areas">Service Areas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="space-y-4">
          <WeeklySchedule 
            availableDays={availableDays}
            timeRanges={timeRanges}
            onAddTimeRange={addTimeRange}
            onRemoveTimeRange={removeTimeRange}
            onUpdateTimeRange={updateTimeRange}
            onToggleDayAvailability={toggleDayAvailability}
            onSave={saveAvailability}
            form={form}
          />
        </TabsContent>
        
        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>
        
        <TabsContent value="areas">
          <ServiceAreasTab />
        </TabsContent>
      </Tabs>

      <VacationRequestDialog 
        open={vacationDialogOpen} 
        onOpenChange={setVacationDialogOpen}
        onSubmit={handleVacationRequest}
      />
    </div>
  );
};

export default ProviderAvailability;
