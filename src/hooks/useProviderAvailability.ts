
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Update the interface to include an index signature
export interface DaysAvailability {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  [key: string]: boolean; // Add index signature to allow string indexing
}

interface TimeRange {
  id: number;
  day: string;
  start: string;
  end: string;
}

export const useProviderAvailability = () => {
  const [selectedTab, setSelectedTab] = useState<string>('schedule');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateEvents, setDateEvents] = useState<any[]>([]);
  const [vacationDialogOpen, setVacationDialogOpen] = useState(false);
  const [vacationRequests, setVacationRequests] = useState<DateRange[]>([]);
  
  // Availability data - removed sunday
  const [availableDays, setAvailableDays] = useState<DaysAvailability>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
  });
  
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { id: 1, day: 'monday', start: '09:00', end: '17:00' },
    { id: 2, day: 'tuesday', start: '09:00', end: '17:00' },
    { id: 3, day: 'wednesday', start: '09:00', end: '17:00' },
    { id: 4, day: 'thursday', start: '09:00', end: '17:00' },
    { id: 5, day: 'friday', start: '09:00', end: '17:00' },
  ]);
  
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  
  // Add event listener for vacation dialog
  useEffect(() => {
    const handleOpenVacationDialog = () => {
      setVacationDialogOpen(true);
    };
    
    window.addEventListener('open-vacation-dialog', handleOpenVacationDialog);
    
    return () => {
      window.removeEventListener('open-vacation-dialog', handleOpenVacationDialog);
    };
  }, []);
  
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
    return { availableDays, timeRanges, unavailableDates };
  };
  
  const toggleDateUnavailable = (date: Date) => {
    if (unavailableDates.some(d => d.toDateString() === date.toDateString())) {
      setUnavailableDates(unavailableDates.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setUnavailableDates([...unavailableDates, date]);
    }
  };

  const handleVacationRequest = async (dateRange: DateRange) => {
    if (dateRange.from) {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("You must be logged in to request vacation");
          return;
        }
        
        // Save vacation request to database
        const { error } = await supabase
          .from('provider_vacation_requests')
          .insert({
            provider_id: user.id,
            start_date: dateRange.from.toISOString(),
            end_date: dateRange.to ? dateRange.to.toISOString() : dateRange.from.toISOString(),
            status: 'pending'
          });
          
        if (error) {
          console.error("Error saving vacation request:", error);
          toast.error("Failed to save vacation request");
          return;
        }
      
        // Update local state  
        setVacationRequests([...vacationRequests, dateRange]);
      
        // Mark all dates in the range as unavailable
        if (dateRange.from && dateRange.to) {
          const start = new Date(dateRange.from);
          const end = new Date(dateRange.to);
          const dates: Date[] = [];
          
          let currentDate = start;
          while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          
          setUnavailableDates([...unavailableDates, ...dates]);
        } else if (dateRange.from) {
          // Single day selection
          setUnavailableDates([...unavailableDates, dateRange.from]);
        }
        
        toast.success("Vacation request submitted for approval");
      } catch (error) {
        console.error("Error handling vacation request:", error);
        toast.error("An error occurred while submitting your vacation request");
      }
    }
  };

  return {
    selectedTab,
    setSelectedTab,
    selectedDate,
    setSelectedDate,
    dateEvents,
    setDateEvents,
    availableDays,
    timeRanges,
    unavailableDates,
    addTimeRange,
    removeTimeRange,
    updateTimeRange,
    toggleDayAvailability,
    saveAvailability,
    toggleDateUnavailable,
    vacationDialogOpen,
    setVacationDialogOpen,
    handleVacationRequest,
    vacationRequests,
  };
};
