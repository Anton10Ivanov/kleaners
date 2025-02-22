
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface TimeSlotsProps {
  timeSlots: string[];
  selectedTimeSlot: string | undefined;
  date: Date | undefined;
  nowInBerlin: Date;
  onTimeSlotSelect: (timeSlot: string) => void;
}

export const TimeSlots = ({
  selectedTimeSlot,
  date,
  nowInBerlin,
  onTimeSlotSelect,
}: TimeSlotsProps) => {
  if (!date) {
    return null;
  }

  const isPastDate = date < nowInBerlin;
  const formattedDate = format(date, "EEEE, MMMM d");

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 19; hour++) {
      for (let minute = 0; minute <= 30; minute += 30) {
        if (hour === 19 && minute === 30) continue; // Skip 19:30 as we want to end at 20:00
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const startTime = `${formattedHour}:${formattedMinute}`;
        
        // Calculate end time
        let endHour = minute === 30 ? hour + 1 : hour;
        let endMinute = minute === 30 ? '00' : '30';
        if (hour === 19 && minute === 0) {
          endHour = 20;
          endMinute = '00';
        }
        const formattedEndHour = endHour.toString().padStart(2, '0');
        slots.push(`${startTime}-${formattedEndHour}:${endMinute}`);
      }
    }
    return slots;
  };

  const checkAvailability = async (timeSlot: string) => {
    const { data: availability } = await supabase
      .from('calendar_availability')
      .select('is_available')
      .eq('date', format(date, 'yyyy-MM-dd'))
      .eq('time_slot', timeSlot)
      .maybeSingle();

    return availability?.is_available ?? true;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Available time slots for {formattedDate}
      </h4>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onTimeSlotSelect(slot)}
            disabled={isPastDate}
            className={`p-3 rounded-lg border text-sm transition-colors ${
              selectedTimeSlot === slot
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50"
            } ${isPastDate ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};
