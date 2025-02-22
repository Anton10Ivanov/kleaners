
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

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
  
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!date) return;
      
      const { data: availability } = await supabase
        .from('calendar_events')
        .select('start_time, end_time')
        .gte('start_time', format(date, 'yyyy-MM-dd'))
        .lt('start_time', format(new Date(date.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));

      const slots = generateTimeSlots().reduce((acc, slot) => {
        const [startTime] = slot.split('-');
        acc[startTime] = true; // Initially set all slots as available
        return acc;
      }, {} as {[key: string]: boolean});

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
    };

    fetchAvailability();
  }, [date, selectedHours]);

  if (!date) {
    return null;
  }

  const isPastDate = date < nowInBerlin;
  const formattedDate = format(date, "EEEE, MMMM d");

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 20; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeSlot = `${formattedHour}:${formattedMinute}`;
        slots.push(`${timeSlot}-${calculateEndTime(timeSlot)}`);
      }
    }
    return slots;
  };

  const calculateEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes);
    endDate.setTime(endDate.getTime() + selectedHours * 60 * 60 * 1000);
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Available time slots for {formattedDate}
      </h4>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {generateTimeSlots().map((slot) => {
          const [startTime] = slot.split('-');
          const isAvailable = availableSlots[startTime];
          
          return (
            <button
              key={slot}
              onClick={() => isAvailable && onTimeSlotSelect(slot)}
              disabled={isPastDate || !isAvailable}
              className={`p-3 rounded-lg border text-sm transition-colors ${
                selectedTimeSlot === slot
                  ? "border-primary bg-primary/5"
                  : isAvailable 
                    ? "border-gray-200 hover:border-primary/50"
                    : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};
