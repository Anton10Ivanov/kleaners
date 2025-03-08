
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WeeklySchedule from '@/components/provider/availability/WeeklySchedule';
import CalendarView from '@/components/provider/availability/CalendarView';
import TimeRangeSelector from '@/components/provider/availability/TimeRangeSelector';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';

const ProviderAvailability = () => {
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showVacationDialog, setShowVacationDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('weekly');
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
          <p className="text-muted-foreground">Manage your work schedule and availability</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowTimeSelector(true)}
          >
            <Clock className="h-4 w-4" />
            <span>Set Working Hours</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-pink-500 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950 border"
            onClick={() => setShowVacationDialog(true)}
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Request Time Off</span>
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="weekly" 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Availability</CardTitle>
              <CardDescription>
                Set your recurring weekly availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklySchedule />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                View and manage your schedule on a calendar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Time Off</CardTitle>
          <CardDescription>
            View your approved and pending time off requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>You don't have any upcoming time off.</p>
            <Button 
              variant="outline" 
              className="mt-4 flex items-center gap-2 border-pink-500 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950 border"
              onClick={() => setShowVacationDialog(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Request Time Off</span>
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col space-y-3">
            <div className="text-sm font-medium">How Time Off Works</div>
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Submit time off requests at least 7 days in advance</li>
                <li>Requests are reviewed by the admin team within 48 hours</li>
                <li>You can cancel pending requests at any time</li>
                <li>Approved time off prevents you from being scheduled for jobs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Time selector modal */}
      <TimeRangeSelector
        open={showTimeSelector}
        onOpenChange={setShowTimeSelector}
      />
      
      {/* Vacation request dialog */}
      <VacationRequestDialog
        open={showVacationDialog}
        onOpenChange={setShowVacationDialog}
      />
    </div>
  );
};

export default ProviderAvailability;
