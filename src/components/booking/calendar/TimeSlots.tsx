
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { TimeSlider } from "@/components/ui/time-slider";

interface TimeSlotsProps {
  selectedTimeSlot: string | undefined;
  date: Date | undefined;
  nowInBerlin: Date;
  onTimeSlotSelect: (timeSlot: string) => void;
  selectedHours: number;
}

export const TimeSlots = ({
  selectedTimeSlot,
  date,
  nowInBerlin,
  onTimeSlotSelect,
  selectedHours,
}: TimeSlotsProps) => {
  const [availableSlots, setAvailableSlots] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!date) return;
      
      setIsLoading(true);
      
      try {
        const { data: availability } = await supabase
          .from('calendar_events')
          .select('start_time, end_time')
          .gte('start_time', format(date, 'yyyy-MM-dd'))
          .lt('start_time', format(new Date(date.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));

        // Generate all possible time slots
        const slots: {[key: string]: boolean} = {};
        for (let hour = 8; hour <= 20; hour++) {
          for (let minute = 0; minute <= 30; minute += 30) {
            if (hour === 20 && minute > 0) break; // Stop at 20:00
            const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots[timeStr] = true; // Initially all available
          }
        }

        // Mark slots as unavailable if they overlap with existing bookings
        if (availability) {
          availability.forEach(booking => {
            const bookingStart = new Date(booking.start_time);
            const bookingEnd = new Date(booking.end_time);
            
            Object.keys(slots).forEach(slotTime => {
              const [hours, minutes] = slotTime.split(':').map(Number);
              const slotDate = new Date(date);
              slotDate.setHours(hours, minutes);
              
              const slotEndDate = new Date(slotDate.getTime() + selectedHours * 60 * 60 * 1000);
              
              if (
                (slotDate >= bookingStart && slotDate < bookingEnd) ||
                (slotEndDate > bookingStart && slotEndDate <= bookingEnd) ||
                (slotDate <= bookingStart && slotEndDate >= bookingEnd)
              ) {
                slots[slotTime] = false;
              }
            });
          });
        }
        
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailability();
  }, [date, selectedHours]);

  if (!date) {
    return null;
  }

  const isPastDate = date < nowInBerlin;
  const formattedDate = format(date, "EEEE, MMMM d");

  const handleTimeChange = (startTime: string) => {
    // Calculate end time based on selected hours
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + selectedHours * 60 * 60 * 1000);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    
    const timeSlot = `${startTime}-${endTime}`;
    onTimeSlotSelect(timeSlot);
  };

  const currentStartTime = selectedTimeSlot ? selectedTimeSlot.split('-')[0] : '08:00';

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Available time for {formattedDate}
      </h4>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <TimeSlider
            value={currentStartTime}
            onChange={handleTimeChange}
          />
          
          {selectedTimeSlot && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected booking time: <span className="font-medium text-primary">{selectedTimeSlot}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
