"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/logging";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";

interface EnhancedCalendarProps {
  form: UseFormReturn<BookingFormData>;
  className?: string;
}

function EnhancedCalendar({ form, className }: EnhancedCalendarProps) {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(form.watch('date'));
  const [time, setTime] = useState<string | null>(form.watch('preferredTime') || null);
  const [availableProviders, setAvailableProviders] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState([
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
  ]);

  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode');

  // Fetch available providers and update time slots based on availability
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!date || !postalCode) return;
      
      try {
        // Fetch providers who service this postal code
        const { data: providers, error } = await supabase
          .from('service_providers')
          .select(`
            id,
            first_name,
            last_name,
            provider_service_areas(postal_code),
            provider_availability(start_time, end_time)
          `)
          .eq('status', 'approved')
          .contains('provider_service_areas.postal_code', [postalCode]);
          
        if (error) {
          logger.error('Failed to fetch providers', { error: error.message, postalCode }, 'EnhancedCalendar');
          return;
        }
        
        // Update time slot availability based on provider schedules
        const updatedTimeSlots = timeSlots.map(slot => {
          const [hour, minute] = slot.time.split(':').map(Number);
          const slotDateTime = new Date(date);
          slotDateTime.setHours(hour, minute);
          
          const availableProvidersForSlot = providers?.filter(provider => {
            return provider.provider_availability?.some((availability: any) => {
              const availStart = new Date(availability.start_time);
              const availEnd = new Date(availability.end_time);
              return slotDateTime >= availStart && slotDateTime <= availEnd;
            });
          }) || [];
          
          return {
            ...slot,
            available: availableProvidersForSlot.length > 0
          };
        });
        
        setTimeSlots(updatedTimeSlots);
        setAvailableProviders(providers || []);
        
      } catch (err) {
        logger.error('Failed to process provider availability', { 
          error: err instanceof Error ? err.message : 'Unknown error' 
        }, 'EnhancedCalendar');
      }
    };
    
    fetchAvailability();
  }, [date, postalCode]);

  // Update providers when time is selected
  useEffect(() => {
    if (!date || !time) return;
    
    const [hour, minute] = time.split(':').map(Number);
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hour, minute);
    
    const availableProvidersForTime = availableProviders.filter(provider => {
      return provider.provider_availability?.some((availability: any) => {
        const availStart = new Date(availability.start_time);
        const availEnd = new Date(availability.end_time);
        return selectedDateTime >= availStart && selectedDateTime <= availEnd;
      });
    });
    
    if (availableProvidersForTime.length > 0) {
      const providerOptions = availableProvidersForTime.map(p => ({
        id: p.id,
        name: `${p.first_name} ${p.last_name}`,
        rating: 4.5,
        price: 25
      }));
      form.setValue('providerOptions', providerOptions);
    } else {
      form.setValue('providerOptions', []);
    }
  }, [date, time, availableProviders, form]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setTime(null);
    form.setValue('date', newDate);
    form.setValue('preferredTime', undefined);
    form.setValue('providerOptions', []);
  };

  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
    form.setValue('preferredTime', selectedTime);
  };

  return (
    <div className={className}>
      <div className="rounded-lg border border-border">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="p-2 sm:pe-5 bg-background"
            disabled={[
              { before: today },
            ]}
          />
          <div className="relative w-full max-sm:h-48 sm:w-40">
            <div className="absolute inset-0 border-border py-4 max-sm:border-t">
              <ScrollArea className="h-full border-border sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <p className="text-sm font-medium">
                      {date ? format(date, "EEEE, d") : "Select a date"}
                    </p>
                  </div>
                  {date && (
                    <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                      {timeSlots.map(({ time: timeSlot, available }) => (
                        <Button
                          key={timeSlot}
                          variant={time === timeSlot ? "default" : "outline"}
                          size="sm"
                          className="w-full"
                          onClick={() => handleTimeSelect(timeSlot)}
                          disabled={!available}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Provider availability feedback */}
      {time && (
        <div className="mt-4">
          {availableProviders.length > 0 ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-800 dark:text-green-300">
                  <span className="font-medium">{availableProviders.length}</span> provider{availableProviders.length !== 1 ? 's' : ''} available at this time
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 p-3 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                No providers currently available at this time. Your booking will be matched with the next available provider.
              </p>
            </div>
          )}
        </div>
      )}
      
      {!time && date && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
          Select a time from the available slots, or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact us
          </Link>
        </p>
      )}
    </div>
  );
}

export { EnhancedCalendar };