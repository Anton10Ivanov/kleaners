import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns';
import { Calendar, Clock, Users, Plus, Trash2, Save, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { CleanerSchedule, BookingRule } from './UnifiedCalendar';

interface AdminScheduleManagerProps {
  cleaners: CleanerSchedule[];
  bookingRules: BookingRule;
  onCleanersUpdate: (cleaners: CleanerSchedule[]) => void;
  onBookingRulesUpdate: (rules: BookingRule) => void;
  className?: string;
}

export const AdminScheduleManager: React.FC<AdminScheduleManagerProps> = ({
  cleaners,
  bookingRules,
  onCleanersUpdate,
  onBookingRulesUpdate,
  className
}) => {
  const [editingCleaner, setEditingCleaner] = useState<CleanerSchedule | null>(null);
  const [newCleaner, setNewCleaner] = useState<Partial<CleanerSchedule>>({
    name: '',
    availableSlots: [],
    blockedDates: [],
    maxDailyBookings: 5
  });
  const [editingRules, setEditingRules] = useState<BookingRule>(bookingRules);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();

  // Generate time slots based on booking rules
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const [startHour, startMinute] = editingRules.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = editingRules.workingHours.end.split(':').map(Number);
    
    const startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);
    
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + editingRules.slotDuration * 60000);
      
      if (slotEnd <= endTime) {
        const startTimeStr = format(currentTime, 'HH:mm');
        const endTimeStr = format(slotEnd, 'HH:mm');
        slots.push(`${startTimeStr}-${endTimeStr}`);
      }
      
      currentTime = new Date(currentTime.getTime() + (editingRules.slotDuration + editingRules.breakDuration) * 60000);
    }
    
    return slots;
  };

  // Handle cleaner creation
  const handleCreateCleaner = () => {
    if (!newCleaner.name?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a cleaner name",
        variant: "destructive"
      });
      return;
    }

    const cleaner: CleanerSchedule = {
      id: `cleaner-${Date.now()}`,
      name: newCleaner.name.trim(),
      availableSlots: newCleaner.availableSlots || [],
      blockedDates: newCleaner.blockedDates || [],
      maxDailyBookings: newCleaner.maxDailyBookings || 5
    };

    onCleanersUpdate([...cleaners, cleaner]);
    setNewCleaner({
      name: '',
      availableSlots: [],
      blockedDates: [],
      maxDailyBookings: 5
    });

    toast({
      title: "Success",
      description: `Cleaner "${cleaner.name}" created successfully`
    });
  };

  // Handle cleaner update
  const handleUpdateCleaner = (updatedCleaner: CleanerSchedule) => {
    const updatedCleaners = cleaners.map(cleaner => 
      cleaner.id === updatedCleaner.id ? updatedCleaner : cleaner
    );
    onCleanersUpdate(updatedCleaners);
    setEditingCleaner(null);

    toast({
      title: "Success",
      description: `Cleaner "${updatedCleaner.name}" updated successfully`
    });
  };

  // Handle cleaner deletion
  const handleDeleteCleaner = (cleanerId: string) => {
    const cleaner = cleaners.find(c => c.id === cleanerId);
    if (cleaner) {
      onCleanersUpdate(cleaners.filter(c => c.id !== cleanerId));
      toast({
        title: "Success",
        description: `Cleaner "${cleaner.name}" deleted successfully`
      });
    }
  };

  // Handle booking rules update
  const handleUpdateBookingRules = () => {
    onBookingRulesUpdate(editingRules);
    toast({
      title: "Success",
      description: "Booking rules updated successfully"
    });
  };

  // Toggle time slot for cleaner
  const toggleTimeSlot = (cleanerId: string, timeSlot: string) => {
    const cleaner = cleaners.find(c => c.id === cleanerId);
    if (!cleaner) return;

    const updatedCleaner = {
      ...cleaner,
      availableSlots: cleaner.availableSlots.includes(timeSlot)
        ? cleaner.availableSlots.filter(slot => slot !== timeSlot)
        : [...cleaner.availableSlots, timeSlot]
    };

    handleUpdateCleaner(updatedCleaner);
  };

  // Toggle blocked date for cleaner
  const toggleBlockedDate = (cleanerId: string, date: string) => {
    const cleaner = cleaners.find(c => c.id === cleanerId);
    if (!cleaner) return;

    const updatedCleaner = {
      ...cleaner,
      blockedDates: cleaner.blockedDates.includes(date)
        ? cleaner.blockedDates.filter(d => d !== date)
        : [...cleaner.blockedDates, date]
    };

    handleUpdateCleaner(updatedCleaner);
  };

  // Generate week dates for calendar view
  const weekDates = eachDayOfInterval({
    start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
    end: addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), 6)
  });

  const allTimeSlots = generateTimeSlots();

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Schedule Management</h2>
        <Badge variant="outline" className="text-sm">
          {cleaners.length} Cleaners
        </Badge>
      </div>

      <Tabs defaultValue="cleaners" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cleaners">Cleaners</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="rules">Booking Rules</TabsTrigger>
        </TabsList>

        {/* Cleaners Tab */}
        <TabsContent value="cleaners" className="space-y-4">
          {/* Add New Cleaner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Cleaner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cleaner-name">Cleaner Name</Label>
                  <Input
                    id="cleaner-name"
                    value={newCleaner.name || ''}
                    onChange={(e) => setNewCleaner(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter cleaner name"
                  />
                </div>
                <div>
                  <Label htmlFor="max-bookings">Max Daily Bookings</Label>
                  <Input
                    id="max-bookings"
                    type="number"
                    min="1"
                    max="10"
                    value={newCleaner.maxDailyBookings || 5}
                    onChange={(e) => setNewCleaner(prev => ({ 
                      ...prev, 
                      maxDailyBookings: parseInt(e.target.value) || 5 
                    }))}
                  />
                </div>
              </div>
              <Button onClick={handleCreateCleaner} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Cleaner
              </Button>
            </CardContent>
          </Card>

          {/* Cleaners List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cleaners.map((cleaner) => (
              <Card key={cleaner.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cleaner.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingCleaner(cleaner)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCleaner(cleaner.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <div>Available slots: {cleaner.availableSlots.length}</div>
                    <div>Blocked dates: {cleaner.blockedDates.length}</div>
                    <div>Max daily bookings: {cleaner.maxDailyBookings}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schedules Tab */}
        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule View
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Time Slots Grid */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Available Time Slots</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {allTimeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="text-sm text-center p-2 border rounded">
                      {timeSlot}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cleaner Schedules */}
              <div className="space-y-6">
                {cleaners.map((cleaner) => (
                  <div key={cleaner.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-4">{cleaner.name}</h4>
                    
                    {/* Time Slots Selection */}
                    <div className="mb-4">
                      <Label className="text-sm font-medium">Available Time Slots</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
                        {allTimeSlots.map((timeSlot) => (
                          <button
                            key={timeSlot}
                            onClick={() => toggleTimeSlot(cleaner.id, timeSlot)}
                            className={cn(
                              "p-2 text-xs border rounded transition-colors",
                              cleaner.availableSlots.includes(timeSlot)
                                ? "bg-green-100 border-green-500 text-green-700"
                                : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                            )}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Blocked Dates */}
                    <div>
                      <Label className="text-sm font-medium">Blocked Dates</Label>
                      <div className="grid grid-cols-7 gap-1 mt-2">
                        {weekDates.map((date) => {
                          const dateStr = format(date, 'yyyy-MM-dd');
                          const isBlocked = cleaner.blockedDates.includes(dateStr);
                          return (
                            <button
                              key={dateStr}
                              onClick={() => toggleBlockedDate(cleaner.id, dateStr)}
                              className={cn(
                                "p-2 text-xs border rounded transition-colors",
                                isBlocked
                                  ? "bg-red-100 border-red-500 text-red-700"
                                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                              )}
                            >
                              {format(date, 'd')}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Booking Rules Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="min-advance">Minimum Advance Hours</Label>
                    <Input
                      id="min-advance"
                      type="number"
                      min="1"
                      value={editingRules.minAdvanceHours}
                      onChange={(e) => setEditingRules(prev => ({
                        ...prev,
                        minAdvanceHours: parseInt(e.target.value) || 1
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="max-advance">Maximum Advance Days</Label>
                    <Input
                      id="max-advance"
                      type="number"
                      min="1"
                      max="365"
                      value={editingRules.maxAdvanceDays}
                      onChange={(e) => setEditingRules(prev => ({
                        ...prev,
                        maxAdvanceDays: parseInt(e.target.value) || 30
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="start-time">Working Hours Start</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={editingRules.workingHours.start}
                      onChange={(e) => setEditingRules(prev => ({
                        ...prev,
                        workingHours: {
                          ...prev.workingHours,
                          start: e.target.value
                        }
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="end-time">Working Hours End</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={editingRules.workingHours.end}
                      onChange={(e) => setEditingRules(prev => ({
                        ...prev,
                        workingHours: {
                          ...prev.workingHours,
                          end: e.target.value
                        }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="slot-duration">Slot Duration (minutes)</Label>
                    <Input
                      id="slot-duration"
                      type="number"
                      min="30"
                      step="30"
                      value={editingRules.slotDuration}
                      onChange={(e) => setEditingRules(prev => ({
                        ...prev,
                        slotDuration: parseInt(e.target.value) || 120
                      }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                    <Input
                      id="break-duration"
                      type="number"
                      min="0"
                      step="15"
                      value={editingRules.breakDuration}
                      onChange={(e) => setEditingRules(prev => ({
                        ...prev,
                        breakDuration: parseInt(e.target.value) || 30
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Changes to booking rules will affect all cleaners and may impact existing bookings. 
                  Please review carefully before saving.
                </AlertDescription>
              </Alert>

              <Button onClick={handleUpdateBookingRules} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Booking Rules
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminScheduleManager;
